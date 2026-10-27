import bcrypt from 'bcryptjs' 
import crypto from 'crypto'
import { Resend } from 'resend'
import { criarToken } from '../api/_auth.js'
import { setCookie } from'../cookieHelp/setCookie.js' 
import * as authRepository from '../repositories/authRepository.js'
import * as userRepository from '../repositories/userRepositories.js'
import * as empresaRepository from '../repositories/empresaRepository.js'

//CONSTANTES GLOBAIS
const resend = new Resend(process.env.RESEND_API_KEY);
const MAX_TENTATIVAS = 5
const TEMPO_BLOQUEIO_MIN = 15



export const authServices={
    async loginServices(email,senha,ip) {
    
    // 1. BUSCAR USUARIO
    const usuario = await authRepository.findByEmail(email);
    if(!usuario) {
      await authRepository.salvarLog(email, ip, false);
      throw new Error('INVALID_CREDENTIALS')
   }

    // 2. VERIFICAR BLOQUEIO
    if(usuario.bloqueado_ate && new Date() < new Date(usuario.bloqueado_ate)) {
      const minutos = Math.ceil((new Date(usuario.bloqueado_ate) - new Date()) / 1000 / 60);
      throw new Error('Conta bloqueada')
    }

    // 3. COMPARAR SENHA
    const hashSalvo = usuario.senha_hash;
    if (!hashSalvo)  throw new Error('CONTA SEM SENHA')
     
        const senhaCorreta = await bcrypt.compare(senha, hashSalvo);
    
    if(!senhaCorreta) {
      // ERROU: aumenta tentativas
      const novasTentativas = (usuario.tentativas_login || 0)+1
      await userRepository.setTentativas(usuario.id,novasTentativas)
      let bloqueado_ate = null;

      if(novasTentativas >= MAX_TENTATIVAS) {
        bloqueado_ate = new Date(Date.now() + TEMPO_BLOQUEIO_MIN * 60 * 1000);
      }
      
    await  authRepository.blockUser(usuario.id,bloqueado_ate)
      await authRepository.salvarLog(email, ip, false);
      
     throw new Error('Credenciais invalidoa')
    }

    // 4. ACERTOU: zera tentativas
    await authRepository.resetAttempts(usuario.id)
    await authRepository.salvarLog(email, ip, true);

    // 5. VALIDAR REGRAS
    const perfis_permitidos = ['direcao','aluno','empresa'];
    if(!perfis_permitidos.includes(usuario.role))throw new Error("Seu cargo não tem essa permissão")
       if(usuario.status!== 'ativo')throw new Error("Conta desativada")
     
    if(usuario.empresa_id && usuario.role!=='admin') {
      const  empresa = await empresaRepository.findEmpresaAtivaById(usuario.empresa_id);
       if(!empresa)  throw new Error('EMPRESA BLOQUEADA')
    }

    // 6. CRIAR TOKEN JWT
    const token = await criarToken(usuario)

    
    return {
      ok: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        empresa_id: usuario.empresa_id,
       },token
    }

  }
  
,
// POST /api/auth/recuperar-senha
 async  recuperarSenha(email) {
     if(!email) throw new Error('E-MAIL OBRIGATORIO') 
  
    const usuarios = await userRepository.findByEmail(email)
  
    if(!usuarios ) return true
   //throw new Error('Se o email existir, enviaremos um link')

    const user = usuarios;

    const tentativas = await authRepository.contarResetsRecentes(user.id)
    if(tentativas >= 3){
    throw new Error('Muitos pedidos. Tente novamente em 10 minutos')
      //  return res.status(429).json({erro:'Muitos pedidos. Tente novamente em 10 minutos'});
    }

    const token = crypto.randomBytes(32).toString('hex'); // <- nativo
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await authRepository.criarResetToken(user.id,token,expiresAt)
//  db.query(`INSERT INTO password_resets(user_id, token, expires_at) VALUES ($1, $2, $3)`, [user.id, token, expiresAt]);

    const resetLink = `https://kumbu-orpin.vercel.app/resetar-senha?token=${token}`; // <- pega da Vercel

    
    await resend.emails.send({
  from: 'KUMBU <onboarding@resend.dev>',
  to: email,
  subject: 'Solicitação de redefinição de senha',
  html: `
    <p>Prezado(a) ${user.nome},</p>
    <p>Recebemos uma solicitação para redefinir a senha da sua conta no sistema KUMBU.</p>
    <p>Para continuar, utilize o link abaixo. Ele é válido por 1 hora:</p>
    <p>
    <a href="${resetLink}" style="display:inline-block; padding:12px 24px; background:#4F46E5; color:#fff; text-decoration:none; border-radius:8px; margin: 16px 0;">
         Redefinir minha senha
      </a>
      </p>
    <p>Caso não tenha solicitado, por favor ignore este e-mail.</p>
    <p>Atenciosamente,<br>Equipa KUMBU</p>
  `
});
}

,
// GET /api/auth/resetar-senha?token=xxx e POST /api/auth/resetar-senha
 async  validarResetToken(token) {
      if(!token)return false

      const reset = await authRepository.findResetValido(token)
  return !!reset
  }

  ,  async resetarSenha(token,novaSenha){
        if(!token || !novaSenha)throw new Error('DADOS INCOMPLETOS') 

    if(novaSenha.length < 8)throw new Error('Senha precisa ter no minimo 8 caracteres')
    const reset = await authRepository.findResetValido(token)
    if(!reset)throw new Error('Token inválido ou expirado')
    const hash = await bcrypt.hash(novaSenha, 10);
    await authRepository.updateSenha(reset.user_id,hash)

     await authRepository.marcarResetUsado(reset.id)
return true
  } 

}

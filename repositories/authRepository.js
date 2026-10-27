import { prisma } from '../api/_prisma.js' // não mais ../api/_db.js






export async function salvarLog(email, ip, sucesso) {
  return await prisma.logLogin.create({ 
    data: { email, ip, sucesso } 
  })
}

export async function contarResetsRecentes(userId) {
   const dataDe10MinAtras = new Date(Date.now() - 10 * 60 * 1000)

   return prisma.passwordReset.count({ 
     where: { 
       userId, 
       createdAt: { gt: dataDe10MinAtras } 
     } 
   })
}

export async function criarResetToken(userId, token, expiresAt)
{
  return await prisma.passwordReset.create({ data: { userId, token, expiresAt } })
  
}

export async function findResetValido(token)
{
  return await prisma.passwordReset.findFirst({ where: { token, usedAt: null, expiresAt: { gt: new Date() } } })
  
}
export async function marcarResetUsado(id)
{
    return await prisma.passwordReset.update({ where: { id }, data: { usedAt: new Date() } })

}
export async function updateSenha(userId, hash)
{
    return await prisma.usuario.update({ where: { id: userId }, data: { senhaHash: hash } })
    
}

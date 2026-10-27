import * as jose from 'jose'
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function criarTokenSeguro(usuario){
    return await new jose.SignJWT({
        sub:String(usuario.id),
        role: usuario.role
    })
    .setProtectedHeader({ alg : 'HS256'})
    .setIssuedAt()
    .setExpirationTime('8h')
    .setJti(crypto.randomUUID())
    .sign(SECRET)
}

export async function verificarTokenSeguro(token)
{
    try{
        const { payload } = await jose.jwtVerify(token,SECRET,{clockTolerance : '5s'});
        return { valido :true, payload}
    }catch(error){
        return {
            valido: false,
            motivo : error.code
        };
    }
}

export async function criarRefreshToken(usuarioId)
{
    return await new jose.SignJWT({
        sub : String(usuarioId),
        type : 'refresh'
    }).setProtectedHeader({ alg : 'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .setJti(crypto.randomUUID())
    .sign(SECRET)

}
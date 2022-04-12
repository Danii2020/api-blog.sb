import jwt from 'jsonwebtoken';


const signToken = (payload:object, secret:string, tokenConfig:object) => {
  return jwt.sign(payload, secret, tokenConfig);
}

const verifyToken = (token:string, secret:string) => {
  return jwt.verify(token, secret);
}

export { signToken, verifyToken }

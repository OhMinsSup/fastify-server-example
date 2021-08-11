import jwt, { SignOptions } from 'jsonwebtoken'

const { SECRET_KEY } = process.env
if (!SECRET_KEY) {
  const error = new Error('InvalidSecretKeyError')
  error.message = 'Secret key for JWT is missing.'
  throw error
}

export const generateToken = (
  payload: any,
  options?: SignOptions
): Promise<string> => {
  const jwtOptions: SignOptions = {
    issuer: 'lafu.io',
    expiresIn: '7d',
    ...options,
  }

  if (!jwtOptions.expiresIn) {
    // removes expiresIn when expiresIn is given as undefined
    delete jwtOptions.expiresIn
  }

  return new Promise((resolve, reject) => {
    if (!SECRET_KEY) return
    jwt.sign(payload, SECRET_KEY, jwtOptions, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

export const decodeToken = <T = any>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!SECRET_KEY) return
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded as any)
    })
  })
}

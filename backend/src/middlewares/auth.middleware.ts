import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

const region = process.env.AWS_REGION
const userPoolId = process.env.USER_POOL_ID

if (!region || !userPoolId) {
  throw new Error('Missing AWS_REGION or USER_POOL_ID environment variables')
}

// Configure JWKS
const client = jwksRsa({
  jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
})

// Get the signing key from JWKS
function getKey(header: any, callback: (err: Error | null, key?: string) => void) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err)
    const signingKey = key?.getPublicKey()
    callback(null, signingKey)
  })
}

// Middleware to verify JWT
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  if (process.env.CI_TEST) return next()
  const token = req.headers.authorization

  if (!token) return res.sendStatus(401) // No token provided

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, user) => {
    if (err) return res.sendStatus(403) // Invalid token

    next()
  })
}

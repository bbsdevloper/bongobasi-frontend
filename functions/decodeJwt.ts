import jwt from 'jsonwebtoken'

export const decodeJWT = (jwtToken: string) => {
    try {
        const decodedToken = jwt.decode(jwtToken)
        console.log('decodedToken:', decodedToken)
        return decodedToken?.sub
    } catch (error: any) {
        console.error('Error decoding JWT token:', error.message)
    }
}

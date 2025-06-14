var jwt = require('jsonwebtoken');

export const jwtEncodeMessage = (obj: any, secret: string) => {
    return jwt.sign(
        obj,
        secret
    )
}
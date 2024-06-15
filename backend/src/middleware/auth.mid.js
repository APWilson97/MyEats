import jwt from "jsonwebtoken";
const { sign, verify } = jwt

export default (req, res, next) => {
    const token = req.headers.access_token
    if (!token) return res.status(401).send()

    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (err) {
        res.status(401).send()
    }

    return next()
}
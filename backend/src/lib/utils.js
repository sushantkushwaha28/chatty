import jwt from 'jsonwebtoken';
export const generateToken = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token will expire in 30 days
    }
    )
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in development
        maxAge: 30 * 24 * 60 * 60 * 1000,// Cookie will expire in 30 days
        sameSite : 'strict',// Helps prevent CSRF attacks

    });
    return token;
}
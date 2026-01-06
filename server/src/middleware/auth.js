import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const protect = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Not authorized, no token' });
            }
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }

};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(401).json({
            message: "Not authorized as admin"
        });
    }
};



export {protect,admin};
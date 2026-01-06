import express from 'express';
import jwt from 'jsonwebtoken';
import {body,validationResult} from 'express-validator';
import User from '../models/User.js';
const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
};
const router = express.Router();
router.post('/register',[
    body('name').notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],async(req,res)=>{
    try {
        console.log("register called")
        const errors = validationResult(req);
        if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});
        }
console.log(req.body);

        const {name,email,password} = req.body;
        const userExists = await User.findOne({$or:[{name},{email}]});

          if (userExists) {
      return res.status(400).json({ message: 'User already exists' });

    }

    const user = await User.create({
        name,
        email,
        password

    });
 res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Server error' });
    }

});

router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
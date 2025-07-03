import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    // Validate input data
    try{
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof fullName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input data type' });
        }
        if (email.length < 5 || password.length < 6) {
            return res.status(400).json({ message: 'Email or password is too short' });
        }
        // Additional validation can be added here
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser  =  new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if(newUser){
            await newUser.save();
            return res.status(201).json({ message: 'User created successfully' });
        }
        else{
            return res.status(500).json({ message: 'Failed to create user' });
        }
    }catch(error){
        console.error(error);
        return res.status(400).json({ message: 'Invalid input data' });
    }
    // Handle user signup logic here
    res.send('Signup route');
};
export const login = (req, res) => {
    // Handle user login logic here
    res.send('Login route');
};
export const logout = (req, res) => {
    // Handle user logout logic here
    res.send('Logout route');
};

import User from "../models/User.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        User.findByUsername(username, async (err, user) => {
            if (err) {
                if (err.type === 'not_found') {
                    return res.status(404).json({ message: 'User not found' });
                } else {
                    return res.status(500).json({ message: 'Internal server error' });
                }
            }

            // Check if the password is correct
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send the token in the response
            res.json({ token });
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if username is already exist
        const userExists = await new Promise((resolve, reject) => {
            User.findByUsername(username, (err, data) => {
                if (err) {
                    if (err.type === 'not_found') {
                        resolve(false); // Username does not exist
                    } else {
                        reject(err); // Error occurred
                    }
                } else {
                    resolve(true); // Username already exists
                }
            });
        });

        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });

        User.create(userData, (err, data) => {
            if (err) res.status(500).send({ msg: "Exist some error" });
            res.send(data);
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

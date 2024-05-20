import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        const createdUser = new User({
            fullname,
            email,
            password: hashPassword
        })
        await createdUser.save()
        res.status(201).json({ message: "User created successfully", 
    user: {
        _id:createdUser._id,
        fullname: createdUser.fullname,
        email:createdUser.email
    } })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "INternal server error, well its user.controller here so check it out YO!"
        })
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);


        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!user || !isMatch) {
            return res.status(400).json({ message: "Inavalid Id or password" });
        }
        else{
            res.status(200).json({message: "Login successful", user: {
                fullname: user.fullname,
                email: user.email,
                id: user._id
            }})
        }

    } catch (error) {
console.log("Error in Login")
res.status(500).json({message: "Internal Server error at login contrller"})
    }
}


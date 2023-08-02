import UserModel from "../models/users.model.js";
import jsonwebtoken from "jsonwebtoken";
export const getLogin = async (req, res) => {
    try {
        //console.log(req.body);
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(400).json({
                status: false,
                message: 'Please enter email and password'
            })
        }

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                status: false,
                message: 'Please enter correct email and password.'
            });
        }

        const validPassword = user.matchPassword(password);
        if(!validPassword){
            return res.status(400).json({
                status: false,
                message: 'Please enter correct email and password.'
            });
        }
        const secretKey = process.env.JWT_SECRT_KEY;
        const token = jsonwebtoken.sign({id: user._id}, secretKey, {expiresIn: '1d'});
        const data = {
            jwt_token: token,            
        }
        await UserModel.findOneAndUpdate({_id: user._id}, {$set: data}, {new: true});
        return res.status(200).json({
            status: true,
            token,
            message: 'User logged in successfulyly.'
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

export const getRegister = async (req, res) => {
    try {
        //console.log(req.body);
        const {name, email, password, phone} = req.body;
        if(!name || !email || !password ){
            return res.status(400).json({
                status: false,
                message: 'Please enter name, email and password'
            })
        }

        const user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({
                status: false,
                message: 'This email has already registered.'
            });
        }

        const data = {
            name, email, password
        }

        const newUser = new UserModel(data);
        await newUser.save();

        if(newUser){
            return res.status(200).json({
                status: true,
                data: newUser,
                message: 'User created successfully.'
            });
        } else{
            return res.status(400).json({
                status: false,
                message: 'User created failed.'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }

}

export const getProfile = async(req, res) => {
    try {
        console.log(req.user);
        if(req.user){
            return res.status(200).json({
                status: true,
                data: req.user,
                message: 'User get successfully.'
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}
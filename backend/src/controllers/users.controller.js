import UserModel from "../models/users.model.js";
import jsonwebtoken from "jsonwebtoken";

import crypto from "crypto";

import sendMail from "../utils/sendmail.js";

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

export const fortgetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        console.log(email);
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                status: false,
                message: 'Please enter the valid user email.'
            });
        }

        const resettoken = user.getResetToken();
        
        console.log(resettoken, user);
        //user.save({validateBeforeSave: false});
        const mailMessage =
            "your are using. Your reset token is <a href='http://localhost:5173/resetpassword/" +
            resettoken + "'>Click here to reset password</a>" +
            "<br> your token will expire in ten minutes.";
        const data = {
            to: user.email,
            subject: "Password reset token",
            message: mailMessage
        } 
        //console.log(data);
        try {

            await sendMail(data);
            user.save({validateBeforeSave: false});
        } catch (error) {
            user.resetPasswordToken = "";
            user.resetPasswordExpired = "";
            await user.save({ validateBeforeSave: false });
            return res.status(400).json({
              success: false,
              message: error.message,
            });
        }

        return res.status(200).json({
            status: true,
            message: "Email sent successfully.",
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {resettoken} = req.params;
        const { password } = req.body;
        const resetPassToken = crypto.createHash('sha512').update(resettoken, 'utf-8').digest('hex');
        //{ $lte: 5 }
        const today = Date.now();
        const readableToday = new Date(today);
        console.log(readableToday);
        const user = await UserModel.findOne({resetPasswordToken: resetPassToken, resetPasswordExpired: {$gte: readableToday}});
        console.log(user);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid password token / password expired",
              });
        }

        //const hashPass = await hashPassword(req.body.password);
        const data = {
            password,
            resetPasswordToken: "",
            resetPasswordExpired: "",
        };
        //await user.updateOne()
        await UserModel.findOneAndUpdate(
            { _id: user._id },
            { $set: data },
            {
                new: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}
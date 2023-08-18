import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/users.model.js";

export const AuthMiddleware = async (req, res, next) => {
    //console.log(req.headers);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const secretKey = process.env.JWT_SECRT_KEY;
        const id = jsonwebtoken.verify(token, secretKey, function(err, decoded) {            
            if(err){
                return res.status(400).json({
                    status: false,
                    message: err.message
                })
            }
            return decoded.id;
        });
        const user = await UserModel.findById(id).select('-password');
        req.user = user;
        next();
    }else{
        return res.status(401).json({
            status: false,                
            message: 'You are not authorized to access this resource.'
        });
    }
}

export const authorize = async (req, res, next) => {
    try {
        if(req.user){
            const validroles = req.user.roles === 'admin';
            if(!validroles){
                return res.status(401).json({
                    status: false,                
                    message: 'You are not authorized to access this resource.'
                });
            }    
            next();                
        }
    } catch (error) {
        return res.status(401).json({
            status: false,                
            message: error.message
        });
    }
}

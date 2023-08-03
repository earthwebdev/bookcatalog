import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 3,
    },
    phone: {
        type: String,        
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, 'Please enter valid email'],
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    jwt_token:{
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpired: {
        type: Date,
    }
},
{
    timestamps: true
});

UserSchema.methods.matchPassword = function(pwd)  {
    const match = bcrypt.compare(pwd, this.password);
    if(match){
        return true;
    }
    return false;
}

UserSchema.pre("save", async function(next) {
    //console.log(this.password);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    //console.log(hash, ' == ', salt);
    this.password = hash;
    next();
});

UserSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {    
    const data = this.getUpdate();
    //console.log(data.$set.password, this.password);
    if(data.$set.password !== undefined){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.$set.password, salt);
        console.log(hash, ' == ', salt);
        data.$set.password = hash;
        next();
    } else {
        next();
    }    
});


UserSchema.methods.getResetToken = function() {
    const resetToken = crypto.randomBytes(16).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha512').update(resetToken, 'utf-8').digest('hex');
    this.resetPasswordExpired = Date.now() + 24*60*60*1000;

    return resetToken;
}
    

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
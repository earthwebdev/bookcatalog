import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name should be more than 3 characters'],
    },
    description:{
        type: String,
        required: true,
        minLength: [10, 'Name should be more than 10 characters'],
    },
    photo:{
        type: String,
        required: true,
    },
    public_id:{
        type: String
    }
},
{
    timestamps: true,
});

const AuthorModel = mongoose.model("Author", AuthorSchema);
export default AuthorModel;
import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
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
    },
    parentsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        default: null,
    }
},
{
    timestamps: true,
}
);

const GenreModel = mongoose.model("Genre", GenreSchema);
export default GenreModel;
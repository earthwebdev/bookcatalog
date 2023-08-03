import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    rating:{
        type: Number,
        required: true,
        max: 5
    },
    url: {
        type: String,
        required: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 
                'Please enter the valid url'],
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;
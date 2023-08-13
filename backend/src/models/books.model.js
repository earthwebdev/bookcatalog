import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength: [3, 'Title should be more than 3 characters']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be more than 10 characters']
    },
    imageUrl: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
    },
    genres:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    authors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,        
    },
    pageCount:{
        type: Number,
        required: true,
    },
    weight:{
        type: String,
        required:true,
    },
    language:{
        type: String,
        required:true,
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
});

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;
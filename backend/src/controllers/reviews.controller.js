import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import ReviewModel from "../models/reviews.model.js";
import BookModel from "../models/books.model.js";
import mongoose from "mongoose";

import fs from 'fs';

export const getReviews = async (req, res) => {
    try {
        //console.log('aaaaa goes heres');
        return res.status(200).json(res?.filteredResults);
    
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
}

export const getReviewById = async (req, res) => {
    try {
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            });
        }
        //console.log(id, 'id');
        const populates = req.query.populate;
        //console.log(req.query.populate, ' pupulate', populates);
        let reviewData;
        if(populates === undefined){
            reviewData = await ReviewModel.findById(id).populate('bookId','title').populate('userId', 'name');            
        } else {
            reviewData = await ReviewModel.findById(id);
        }
        
        //console.log(bookData);
        if(!reviewData){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: reviewData,
            message: 'Review found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 

}

export const getReviewsByBookId = async (req, res) => {
    try {
        const {bookId} = req.params;
        if(! mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            });
        }
        //console.log(id, 'id');
        const bookData = await BookModel.findById(bookId);
        //console.log(bookData);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }

        const reviewData = await ReviewModel.find({bookId});
        if(!reviewData){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: reviewData,
            message: 'Review found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 

}

export const createReviews = async (req, res) => {
    try {

        console.log(req.body);
        const {title, description, rating, url, bookId, status} = req.body;
        if(!title || !description || !rating || !bookId || !status ){
            return res.status(400).json({
                status: false,
                message: 'Please enter title, description, rating and bookId.'
            });
        }

        if(! mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            });
        }
        //console.log(id, 'id');
        const bookData = await BookModel.findById(bookId);
        //console.log(bookData);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }
        
        //console.log(req.body);
        const userId = req.user.id
        let data = {
            title, description, rating, url, bookId, userId, status
        }
       
        //console.log(data);
        let review = new ReviewModel(data);
        await review.save();        
       
        return res.status(200).json({
            status: true,
            data: review,
            message: 'Review created successfully.'
        }); 
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const updateReviews = async (req, res) => {
    try {
        //console.log(req.fileValidationError);
        //console.log(req.params);
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            });
        }
        //console.log(id, 'id');
        const reviewData = await ReviewModel.findById(id);
        //console.log(reviewData);
        if(!reviewData){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            }); 
        }

        //console.log(req.body);
        const {title, description, rating, url, bookId, status} = req.body;
        if(!title || !description || !rating || !bookId ){
            return res.status(400).json({
                status: false,
                message: 'Please enter title, description, rating and bookId.'
            });
        }

        if(! mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            });
        }
        //console.log(id, 'id');
        const bookData = await BookModel.findById(bookId);
        //console.log(bookData);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }
        const reviewUserId = reviewData.userId;
        //console.log(req.body);
        const userId = req.user.id
        let data = {
            title, description, rating, url, bookId, status
        }
        console.log(userId, ' === ', reviewUserId.toString());
        if(reviewUserId === '' || (reviewUserId.toString() !== userId && req.user.roles === 'user') ){
            return res.status(400).json({
                status: false,
                message: 'You are not authorized to access this resource.'
            }); 
        }

        /* const review =  ReviewModel(data);
        await review.save(); */
        const review = await  ReviewModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        if(review){
            return res.status(200).json({
                status: true,
                data: review,
                message: 'Review updated successfully.'
            });
        }else {
            return res.status(400).json({
                status: false,
                message: 'Review updated failed.'
            });
        }
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const deleteReviews = async (req, res) => {
    try {        
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            });
        }
        const reviewData = await ReviewModel.findById(id);
        if(!reviewData){
            return res.status(400).json({
                status: false,
                message: 'Review not found.'
            }); 
        }
        
        const reviewUserId = reviewData.userId;
        //console.log(req.body);
        const userId = req.user.id;
        if(req.user.roles === 'admin'){

        }
        if(reviewUserId === '' || (reviewUserId.toString() !== userId && req.user.roles === 'user') ){
            return res.status(400).json({
                status: false,
                message: 'You are not authorized to access this resource.'
            }); 
        } 
                
        //return;
        //const review = await  ReviewModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        await ReviewModel.findOneAndDelete({_id: id});
        
        return res.status(200).json({
            status: true,
            message: 'Review deleted successfully.'
        });
        
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}
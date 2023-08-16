import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import BookModel from "../models/books.model.js";
import mongoose from "mongoose";

import fs from 'fs';

export const getBooks = async (req, res) => {
    try {
        //console.log('aaaaa goes heres');
        return res.status(200).json(res?.filteredResults);
    
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
}

export const getAllBooks = async (req, res) => {
    try {    
        const bookData = await BookModel.find().select('title');
        //console.log(bookData);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: bookData,
            message: 'Book found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 
}

export const getBooksById = async (req, res) => {
    try {
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            });
        }
        //console.log(id, 'id');
       
        const populates = req.query.populate;
        //console.log(req.query.populate, ' pupulate', populates);
        let bookData;
        if(populates === undefined){
            bookData = await BookModel.findById(id).populate('authors','name').populate('genres', 'name');            
        } else {
            bookData = await BookModel.findById(id);
        }
        
        //console.log(bookData);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: bookData,
            message: 'Book found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 

}

export const createBooks = async (req, res) => {
    try {
        //console.log(req.fileValidationError);
        console.log(req.body);
        //console.log(req.fileValidationError);
        if(req.fileValidationError){
            return res.status(400).json({
                status: false,
                message: 'Please upload the valid image files only (png, gif and jpg).'
            });
        }
        //console.log(req.file, 'files');
        if(!req.file){
            return res.status(400).json({
                status: false,
                message: 'Please upload the image file.'
            });
        }

        console.log(req.body);
        const {title, description, genres, authors, ISBN, price, stock, discountPercentage, pageCount, weight, language, isFeatured} = req.body;
        if(!title || !description || !genres || !authors || !ISBN || !price || !stock || !pageCount || !weight || !language){
            return res.status(400).json({
                status: false,
                message: 'Please enter title, description, genres, authors, ISBN, price, stock, discountPercentage, pageCount, weight, language.'
            });
        }
        let public_id;
        let imageUrl;
        console.log(req.file);
        if(req?.file?.path){
            //console.log(req?.file?.path);
            try {
                // Upload the image
                const respCloud = await cloudinary.uploader.upload(req.file.path);
                
                //console.log(respCloud);
                public_id = respCloud.public_id;
                imageUrl = respCloud.secure_url;
            } catch (error) {
                console.error(error.message);
                return res.status(400).json({
                    status: false,
                    message: error.message
                });
            }
        }
        //console.log(req.body);
        
         
        let data = {
            title, description, imageUrl, public_id, genres, authors, ISBN, price, stock, discountPercentage, pageCount, weight, language, isFeatured
        }
        /* req.body.url = url;
        req.body.public_id = public_id; */
        console.log(data);
        let book = new BookModel(data);
        await book.save();
        
        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
        });
        if(!book){
            return res.status(400).json({
                status: false,                
                message: 'Book created failed.'
            });
        }

        return res.status(200).json({
            status: true,
            data: book,
            message: 'Book created successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const updateBooks = async (req, res) => {
    try {
        //console.log(req.fileValidationError);
        //console.log(req.params);
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            });
        }
        //console.log(id, 'id');
        const bookData = await BookModel.findById(id);
        //console.log(bookData);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }

        if(req.fileValidationError){
            return res.status(400).json({
                status: false,
                message: 'Please enter the valid image files only.'
            });
        }

        /* if(!req.file){
            return res.status(400).json({
                status: false,
                message: 'Please upload the image file.'
            });
        } */

        //console.log(req.body);
        const {title, description, genres, authors, ISBN, price, stock, discountPercentage, pageCount, weight, language, isFeatured} = req.body;
        if(!title || !description || !genres || !authors || !ISBN || !price || !stock || !pageCount || !weight || !language){
            return res.status(400).json({
                status: false,
                message: 'Please enter title, description, genres, authors, ISBN, price, stock, discountPercentage, pageCount, weight, language.'
            });
        }
        let public_id;
        let imageUrl;
        if(req.file){
            try {
                // Upload the image
                const respCloud = await cloudinary.v2.uploader.upload(req.file.path);

                //console.log(respCloud);
                public_id = respCloud.public_id;
                imageUrl = respCloud.secure_url;

                if(bookData?.public_id){
                    try {
                        // Upload the image
                        await cloudinary.v2.uploader.destroy(bookData?.public_id);                
                    } catch (error) {
                        console.error(error);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }else{
            public_id = bookData.public_id;
            imageUrl = bookData.secure_url;
        }
        let data = {
            title, description, imageUrl, public_id, genres, authors, ISBN, price, stock, discountPercentage, pageCount, weight, language, isFeatured
        }

        /* const book =  BookModel(data);
        await book.save(); */
        const book = await  BookModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        if(book){
            return res.status(200).json({
                status: true,
                data: book,
                message: 'Book updated successfully.'
            });
        }else {
            return res.status(400).json({
                status: false,
                message: 'Book updated failed.'
            });
        }
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const deleteBooks = async (req, res) => {
    try {        
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            });
        }
        const bookData = await BookModel.findById(id);
        if(!bookData){
            return res.status(400).json({
                status: false,
                message: 'Book not found.'
            }); 
        }         
        
        if(bookData?.public_id){
            try {
                //console.log(bookData?.public_id, bookData.url);                
                // delete the image
                await cloudinary.v2.uploader.destroy(bookData?.public_id, function(error,result) {
                    console.log(result, error) }) 
            } catch (error) {
                console.error(error);
            }
        }
        //return;
        //const book = await  BookModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        await BookModel.findOneAndDelete({_id: id});
        
        return res.status(200).json({
            status: true,
            message: 'Book deleted successfully.'
        });
        
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}
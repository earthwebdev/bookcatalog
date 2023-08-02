import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import AuthorModel from "../models/authors.model.js";
import mongoose from "mongoose";

import fs from 'fs';

export const getAuthors = async (req, res) => {
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

export const createAuthors = async (req, res) => {
    try {
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

        //console.log(req.body);
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                status: false,
                message: 'Please enter name and description.'
            });
        }
        let public_id;
        let url;
        //console.log(req.file);
        if(req?.file?.path){
            //console.log(req?.file?.path);
            try {
                // Upload the image
                const respCloud = await cloudinary.uploader.upload(req.file.path);
                
                //console.log(respCloud);
                public_id = respCloud.public_id;
                url = respCloud.secure_url;
            } catch (error) {
                console.error(error.message);
            }
        }
        //console.log(req.body);
        
        let data = {
            name, description, url, public_id
        }
        /* req.body.url = url;
        req.body.public_id = public_id; */
        //console.log(data);
        let author = new AuthorModel(data);
        await author.save();
        
        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
        });
       

        return res.status(200).json({
            status: true,
            data: author,
            message: 'Author created successfully.'
        }); 
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const updateAuthors = async (req, res) => {
    try {
        //console.log(req.fileValidationError);
        //console.log(req.params);
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Author not found.'
            });
        }
        //console.log(id, 'id');
        const authorData = await AuthorModel.findById(id);
        //console.log(authorData);
        if(!authorData){
            return res.status(400).json({
                status: false,
                message: 'Author not found.'
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
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                status: false,
                message: 'Please enter name and description.'
            });
        }
        let public_id;
        let url;
        if(req.file){
            try {
                // Upload the image
                const respCloud = await cloudinary.v2.uploader.upload(req.file.path);

                //console.log(respCloud);
                public_id = respCloud.public_id;
                url = respCloud.secure_url;

                if(authorData?.public_id){
                    try {
                        // Upload the image
                        await cloudinary.v2.uploader.destroy(authorData?.public_id);                
                    } catch (error) {
                        console.error(error);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            public_id = authorData.public_id;
            url = authorData.secure_url;
        }
        const data = {
            name, description, url, public_id
        }

        /* const author =  AuthorModel(data);
        await author.save(); */
        const author = await  AuthorModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        if(author){
            return res.status(200).json({
                status: true,
                data: author,
                message: 'Author updated successfully.'
            });
        }else {
            return res.status(400).json({
                status: false,
                message: 'Author updated failed.'
            });
        }
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const deleteAuthors = async (req, res) => {
    try {        
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Author not found.'
            });
        }
        const authorData = await AuthorModel.findById(id);
        if(!authorData){
            return res.status(400).json({
                status: false,
                message: 'Author not found.'
            }); 
        }         
        
        if(authorData?.public_id){
            try {
                //console.log(authorData?.public_id, authorData.url);                
                // delete the image
                await cloudinary.v2.uploader.destroy(authorData?.public_id, function(error,result) {
                    console.log(result, error) }) 
            } catch (error) {
                console.error(error);
            }
        }
        //return;
        //const author = await  AuthorModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        await AuthorModel.findOneAndDelete({_id: id});
        
        return res.status(200).json({
            status: true,
            message: 'Author deleted successfully.'
        });
        
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}
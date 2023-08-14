import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import GenreModel from "../models/genres.model.js";
import mongoose from "mongoose";

import fs from 'fs';

export const getGenres = async (req, res) => {
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
export const getAllGenres = async (req, res) => {
    try {    
        const genreData = await GenreModel.find().select('name');
        //console.log(bookData);
        if(!genreData){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: genreData,
            message: 'Genre found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 
}
export const getGenreById = async (req, res) => {
    try {
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
            });
        }
        //console.log(id, 'id');
        const genreData = await GenreModel.findById(id);
        //console.log(bookData);
        if(!genreData){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: genreData,
            message: 'Genre found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 

}

export const createGenres = async (req, res) => {
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
        const {name, description, parentsId} = req.body;
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
        //parentsId = parentsId ?? null;
        let data = {
            name, description, url, public_id, parentsId
        }
        /* req.body.url = url;
        req.body.public_id = public_id; */
        //console.log(data);
        let genre = new GenreModel(data);
        await genre.save();
        
        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
        });
       

        return res.status(200).json({
            status: true,
            data: genre,
            message: 'Genre created successfully.'
        }); 
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const updateGenres = async (req, res) => {
    try {
        //console.log(req.fileValidationError);
        //console.log(req.params);
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
            });
        }
        //console.log(id, 'id');
        const genreData = await GenreModel.findById(id);
        //console.log(genreData);
        if(!genreData){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
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

        console.log(req.body);
        const {name, description, parentsId, isSubmitted} = req.body;
        if(!name || !description){
            return res.status(400).json({
                status: false,
                message: 'Please enter name and description.'
            });
        }
        let public_id;
        let url;
        //console.log(isSubmitted, ' == ', req.file );
        if(isSubmitted && req.file ){
            try {
                // Upload the image
                const respCloud = await cloudinary.v2.uploader.upload(req.file.path);

                //console.log(respCloud);
                public_id = respCloud.public_id;
                url = respCloud.secure_url;

                if(genreData?.public_id){
                    try {
                        // Upload the image
                        await cloudinary.v2.uploader.destroy(genreData?.public_id);                
                    } catch (error) {
                        console.error(error);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            public_id = genreData.public_id;
            url = genreData.secure_url;
        }
        //parentsId = parentsId ?? 0;
        let data;
        if(parentsId){
            data = {
                name, description, url, public_id, parentsId
            }
        } else {
            data = {
                name, description, url, public_id
            }
        }
        
        console.log(data);
        /* const genre =  GenreModel(data);
        await genre.save(); */
        const genre = await  GenreModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        if(genre){
            return res.status(200).json({
                status: true,
                data: genre,
                message: 'Genre updated successfully.'
            });
        }else {
            return res.status(400).json({
                status: false,
                message: 'Genre updated failed.'
            });
        }
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const deleteGenres = async (req, res) => {
    try {        
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
            });
        }
        const genreData = await GenreModel.findById(id);
        if(!genreData){
            return res.status(400).json({
                status: false,
                message: 'Genre not found.'
            }); 
        }         
        
        if(genreData?.public_id){
            try {
                //console.log(genreData?.public_id, genreData.url);                
                // delete the image
                await cloudinary.v2.uploader.destroy(genreData?.public_id, function(error,result) {
                    console.log(result, error) }) 
            } catch (error) {
                console.error(error);
            }
        }
        //return;
        //const genre = await  GenreModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});
        await GenreModel.findOneAndDelete({_id: id});
        
        return res.status(200).json({
            status: true,
            message: 'Genre deleted successfully.'
        });
        
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

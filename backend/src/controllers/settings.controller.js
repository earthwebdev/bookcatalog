import SettingModel from "../models/settings.model.js";
import mongoose from "mongoose";

export const getAllSettings = async (req, res) => {
    try {    
        const settingData = await SettingModel.find();
        //console.log(bookData);
        if(!settingData){
            return res.status(400).json({
                status: false,
                message: 'Setting not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: settingData,
            message: 'Setting found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 
}
export const getSettingsByName = async (req, res) => {
    try {
        const {name} = req.params;
        
        //console.log(name, 'id');
        const settingData = await SettingModel.findOne({name});
        //console.log(bookData);
        if(!settingData){
            return res.status(400).json({
                status: false,
                message: 'Setting not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: settingData,
            message: 'Setting found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 
}

export const getSettingsById = async (req, res) => {
    try {
        const {id} = req.params;
        
        //console.log(name, 'id');
        const settingData = await SettingModel.findById(id);
        //console.log(bookData);
        if(!settingData){
            return res.status(400).json({
                status: false,
                message: 'Setting not found.'
            }); 
        }

        return res.status(200).json({
            status: true,
            data: settingData,
            message: 'Setting found successfully.'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    } 

}

export const createSetting = async (req, res) => {
    try {
        //console.log(req.body);
        const {name, value} = req.body;
        if(!name || !value){
            return res.status(400).json({
                status: false,
                message: 'Please enter name and value.'
            });
        }
        
        //console.log(req.body);
        
        let data = {
            name, value
        }
        
        //console.log(data);
        let setting = new SettingModel(data);
        await setting.save();        
       

        return res.status(200).json({
            status: true,
            data: setting,
            message: 'Setting created successfully.'
        }); 
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

export const updateSetting = async (req, res) => {
    try {
        //console.log(req.body);
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Setting not found.'
            });
        }
        console.log(id, 'id');
        const settingData = await SettingModel.findById(id);
        console.log(settingData);
        if(!settingData){
            return res.status(400).json({
                status: false,
                message: 'Setting not found. aaa'
            }); 
        }

        //const { name } = req.params;
        const { name, value} = req.body;
        if(!name || !value){
            return res.status(400).json({
                status: false,
                message: 'Please enter name and value.'
            });
        }
        
        //console.log(req.body);
        
        let data = {
             name, value
        }
        
        //console.log(data);    
        const setting = await  SettingModel.findOneAndUpdate({_id:id}, {$set: data}, {new: true});   
       if(setting){
            return res.status(200).json({
                status: true,
                data: setting,
                message: 'Setting updated successfully.'
            });
       } else {
            return res.status(400).json({
                status: false,
                message: 'Setting updated failed.'
            });
       }         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}


export const deleteSetting = async (req, res) => {
    try {        
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Setting not found.'
            });
        }
        const settingData = await SettingModel.findById(id);
        if(!settingData){
            return res.status(400).json({
                status: false,
                message: 'Setting not found.'
            }); 
        }         
                        
        await SettingModel.findOneAndDelete({_id: id});
        
        return res.status(200).json({
            status: true,
            message: 'Setting deleted successfully.'
        });        
         
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

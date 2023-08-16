import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const SettingModel = mongoose.model('Setting', SettingSchema);

export default SettingModel;
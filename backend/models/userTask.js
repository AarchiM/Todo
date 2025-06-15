import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

const userTaskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    tasks: [taskSchema]
},{ timestamps: true});

const UserTask = mongoose.model('UserTask', userTaskSchema);

export default UserTask;
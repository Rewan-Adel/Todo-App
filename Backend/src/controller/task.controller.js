const Task = require('../model/task.model');
const { serverErrorMessage, badRequestMessage, unAuthorizedMessage } = require('../middleware/error.messages.middleware');
const { taskValidation } = require('../util/task.validation');
const mongoose = require('mongoose');

exports.createTask = async (req, res) => {
    try{
        const {_id} = req.user;
        const { value, error } = taskValidation(req.body);
        if(error) return badRequestMessage(error.details[0].message, res);

        const task = new Task({
            title: value.title, 
            status: value.status || 'pending',
            description: value.description,
            userID: _id
        });
        await task.save();

        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Task created successfully',
            data:{
                task
            }
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.getAllTasks = async (req, res) => {
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id}).populate('userID', 'name email');

        return res.status(200).json({
            status: 'success',
            code: 200,
            data:{
                tasks,
                totalTasks: tasks.length,

            }
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.getOneTask = async (req, res) => {
    const {taskID} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(taskID))
            return badRequestMessage('Invalid task ID', res);

        const task = await Task.findById(taskID);
        if(!task){
            return badRequestMessage('Task not found', res);
        };
        console.log(task.userID.toString(), req.user._id.toString());
        if(task.userID.toString() !== req.user._id.toString()){
            return unAuthorizedMessage('You do not have permission to view this task', res);
        }
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Task retrieved successfully',
            task
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.updateTask = async (req, res) => {
    const {taskID} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(taskID))
            return badRequestMessage('Invalid task ID', res);

        let task = await Task.findById(taskID);
        if(!task){
            return badRequestMessage('Task not found', res);
        };

        if(task.userID.toString() !== req.user._id.toString()){
            return unAuthorizedMessage('You do not have permission to view this task', res);
        }

        task = await Task.findByIdAndUpdate(taskID, req.body, {new: true}).populate('userID', 'name email');


        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Task updated successfully',
            task
        });

    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.deleteTask = async (req, res) => {
    const {taskID} = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(taskID))
            return badRequestMessage('Invalid task ID', res);

        let task = await Task.findById(taskID);
        if(!task){
            return badRequestMessage('Task not found', res);
        };

        if(task.userID.toString() !== req.user._id.toString()){
            return unAuthorizedMessage('You do not have permission to view this task', res);
        }

        task = await Task.findByIdAndDelete(taskID);


        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Task deleted successfully'
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.deleteAllTasks = async (req, res) => {
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id});
        if(tasks.length < 1){
            return badRequestMessage('No tasks found', res);
        }
        await Task.deleteMany({userID: _id});
        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'All tasks deleted successfully'
        });
    }catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.getTasksByStatus = async (req, res) => {
    const {status} = req.params;
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id, status}).populate('userID', 'name email');
        if(tasks.length < 1){
            return badRequestMessage('No tasks found', res);
        };
        return res.status(200).json({
            status: 'success',
            code: 200,
            totalTasks: tasks.length,
            tasks
        });
    }
    catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
};

exports.markTask = async (req, res) => {const {status} = req.params;
const {taskID} = req.params;
try{
    if(!mongoose.Types.ObjectId.isValid(taskID))
        return badRequestMessage('Invalid task ID', res);

    let task = await Task.findById(taskID);
    if(!task){
        return badRequestMessage('Task not found', res);
    };

    if(task.userID.toString() !== req.user._id.toString()){
        return unAuthorizedMessage('You do not have permission to view this task', res);
    }

    if(task.status == 'pending'){
        task.status = 'completed';
    }else{
        task.status = 'pending';
    }
    await task.save();

    return res.status(200).json({
        status: 'success',
        code: 200,
        message: `Task marked as ${task.status}`,
        task
    });
}
catch(error){
    console.log(error);
    return serverErrorMessage(error, res);
}
};

exports.getTaskByTitle = async (req, res) => {
    const {title} = req.params;
    const {_id} = req.user;
    try{
        const tasks = await Task.find({userID: _id, title}).populate('userID', 'name email');
        if(tasks.length < 1){
            return badRequestMessage('No tasks found', res);
        };
        return res.status(200).json({
            status: 'success',
            code: 200,
            data:{
                tasks,
                totalTasks: tasks.length,
            }
        });
    }
    catch(error){
        console.log(error);
        return serverErrorMessage(error, res);
    }
}
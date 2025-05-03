const router = require('express').Router();
const {
    createTask,
    getOneTask,
    getAllTasks,
    updateTask,
    deleteTask,
    deleteAllTasks,
    getTasksByStatus,
    markTask,
    getTaskByTitle
} = require('../controller/task.controller');
const {protect} = require('../middleware/auth.token');

router.use(protect);
router.post('/create',  createTask);

router.get('/get/all', getAllTasks);
router.get('/get/one/:taskID', getOneTask);
router.get('/filter/:status', getTasksByStatus);
router.get('/get/title/:title', getTaskByTitle);

router.put('/mark/:taskID', markTask);
router.put('/update/:taskID', updateTask);

router.delete('/delete/one/:taskID', deleteTask);
router.delete('/delete/all', deleteAllTasks);

module.exports = router;
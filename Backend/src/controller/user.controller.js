
const User = require("../model/user.model.js");
const { updateUserValidation, resetPasswordValidation } = require("../util/user.validation.js");

exports.getUser = async (req, res, next) => {
  const userId = req.params.id || req.user._id;
  let user = await User.findById(userId);
  if (!user) 
    return res.status(404).json({
      status: "fail",
      message: "User not found",
      data: null
    });
  
  return res.status(200).json({
    status: "success",
    data:{
      user
    }
  });
};

exports.updateUser = async (req, res, next) => {
  const { value, error } = updateUserValidation(req.body);
  if (error) 
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
      data: null
    });

  let user = await User.findById(req.user._id);

  if (value.username) {
    let checkUser = await User.findOne({ username: value.username });
    if (checkUser && checkUser._id.toString() !== user._id.toString())
      return next(new appError("Username already exists", 400));
  }

  for (let key in value) {
    user[key] = value[key];
  }
  user.fullName = `${user.firstName} ${user.lastName}`;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Profile has been updated",
    data: {
      user
    }
  });
};

exports.changePassword = async (req, res, next) => {
  let { user } = req;
  
  const isPassMatch = await user.passwordMatch(req.body.currentPassword);
  if (!isPassMatch)
    return res.status(400).json({
      status: "fail",
      message: "Current password is Invalid , please try again",
    });
 
  if (req.body.currentPassword === req.body.newPassword)
    return res.status(400).json({
      status: "fail",
      message: "New password can't be the same as current password",
    });

    const { value, error } = resetPasswordValidation(req.body);
    if (error) 
       return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
        data: null
      });


    const { password } = value;

    user.password = password;
    
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password has been changed",
    });
};

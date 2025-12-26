const express=require('express');
const router=express.Router();
const User=require('./../models/user.js');
const { jwtAuthMiddleware ,generateToken} = require('./../jwt.js');

// SIGNUP
router.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        const newUser=new User(data);
        const response=await newUser.save();
        console.log("user saved");
        const payload={
            id:response._id
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        res.status(200).json({
            message:"User created successfully",
            user:response,
            token
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { aadhar, givenpassword } = req.body;

    if (!aadhar || !givenpassword) {
      return res.status(400).json({
        error: "Aadhar and password are required"
      });
    }

    // ✅ find user ONLY by aadhar
    const user = await User.findOne({ aadharCardNumber: aadhar });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ✅ bcrypt comparison
    const isMatch = await user.comparePassword(givenpassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user._id
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: "Login successful",
      user,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


//profile
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        const userId=userData.id;
        const user=await User.findById(userId);
        res.status(200).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
});

//update profile
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; 
        const { currentPassword, newPassword } = req.body;
        
        const user = await User.findById(userId);

        // FIX: Added '!' before user.comparePassword
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: "Invalid current Password" });
        }

        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports=router;



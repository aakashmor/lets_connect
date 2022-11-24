const express=require('express')
const router=express.Router()
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const auth=require('../../middleware/auth')
dotenv.config()
const {check,validationResult}=require('express-validator')

const User=require('../../models/Users')
                         
                        //CREATE user
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password should be at least 6 characters').isLength({min:6})
],async (req,res)=> {

    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
     const {name,email,password,image}=req.body
     const avatar=image
    try{
               //check if user already exists  
               
       const user=await User.findOne({email}); 
       if(user){
           return res.status(400).json({errors:[{msg:'User already exists'}]})
       }
               //get users gravatar
      
     /*const avatar=gravatar.url(email,{
         s:'200', //size
         r:'pg', //r means rating ..pg means pg rated images for kids only
         d:'mm'   //d means default image
     })  */
      const newUser=new User({
          name,
          email,
          avatar,
          password
      });  
              //bcrypt password
      const salt=await bcrypt.genSalt(10)
      
     newUser.password=await bcrypt.hash(password,salt) 
    
      await newUser.save()
            
       //return jsonwebtoken
       const payload={
        user:{
            id:newUser.id
        }
    }
    jwt.sign(
       payload,
       process.env.jwtSecret,
       {expiresIn:36000},
       (err,token)=>{
            if(err)
            throw err
            res.json({token,id:newUser.id})
       })

    }catch( error)
    {    res.status(500)
         console.log('Server error')    
    }
})

//follow a user
router.put("/:id/follow",auth, async (req, res) => {
    if (req.user.id !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);
        if (!user.followings.includes(req.user.id)) {
          await user.updateOne({ $push: { followings: req.user.id } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("followed");
        }
        else res.status(200).json("done") 
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you can't follow yourself");
    }
  });

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, name, avatar } = friend;
      friendList.push({ _id, name, avatar });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router
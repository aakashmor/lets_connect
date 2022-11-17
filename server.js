const express=require('express')
const connectDB=require('./config/db.js')
const bodyparser=require('body-parser')
const path=require('path')
const dotenv=require('dotenv')

dotenv.config()

const usersRouter=require('./routes/api/users')
const profileRouter=require('./routes/api/profile.js')
const authRouter=require('./routes/api/auth.js')
const uploadRoutes=require('./routes/api/upload.js')
const conversationRoute = require("./routes/api/conversations");
const messageRoute = require("./routes/api/messages");

const app=express()
connectDB()
app.use(bodyparser.json())      //write these before routers
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/users',usersRouter)
app.use('/api/auth',authRouter)
app.use('/profile/api/auth',authRouter)
app.use('/api/profile',profileRouter)
app.use('/api/upload', uploadRoutes)
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT=process.env.PORT||5000

const server=app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });
  
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log(users)
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      //console.log(receiverId,users)
      const user = getUser(receiverId);
      
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
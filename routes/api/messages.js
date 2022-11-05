const router = require("express").Router();
const Message = require("../../models/Message");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
//add

router.post("/", async (req, res) => {
  const text=req.body.text
  req.body.text = await cryptr.encrypt(req.body.text);
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    savedMessage.text=text
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    messages.forEach( (element, index) => {
      messages[index].text = cryptr.decrypt(element.text);
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//decrypt message

router.get("/decrypt",async(req,res)=>{
   try{
     const messages=req.body.messages;
     
    res.status(200).json(messages);
   }catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;

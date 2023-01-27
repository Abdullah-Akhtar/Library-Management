const router = require("express").Router();
const auth = require("../../middleware/auth");
const orders = require("../../models/Order");
const Books = require("../../models/Books");
 
router.get("/addOrder", auth.isLogin, (req, res) => {
  Books.findOne({title:req.body.title},(err , data)=>{
    if(!err && data){
        const newOrder = new orders();
        newOrder.user = req.user.id;
    }
    res.send("No Books Available")
  })
    
  
});

module.exports = router;

const port = 4000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { data } = require("react-router-dom");

app.use(express.json());
app.use(cors());

//Database connection with mongodb  
mongoose.connect("mongodb+srv://y3303190064:fsrx0001@cluster0.loor1ps.mongodb.net/");

//api creation
//req，和res，都是来自HTTP相关互动的，我们在创建Express功能的时候加入他们，他们的值是来自于互动自动加入的。 
app.get("/",(req,res)=>{
    res.send("Express App is running");
})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

//create upload endpoint
app.use('/images',express.static('upload/images'))
//curl.exe -i -X POST -F "product=@`"C:\Users\33031\Desktop\download.jpg`"" http://localhost:4000/upload  
//作为测试用的上传指令
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for product creation
const Product = mongoose.model("Product",{
    id: {
        type: Number,
        require:true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    new_price:{
        type: Number,
        require: true
    },
    old_price:{
        type: Number,
        require: false
    },
    date:{
        type:Date,
        default:Date.now
    },
    aviable:{
        type:Boolean,
        default:true
    }

})
//然后马上写，添加product的功能，用刚刚的product类
add.post('/addproduct',async(req,res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    }) 
    console.log(product);
    await product.save();
    console.log("saved")
    res.json({
        success: true,
        name: req.product.name
    })
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port");
    }
    else{
        console.log("Error :"+error);
    }
})
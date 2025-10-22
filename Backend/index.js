const port = 4000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const path = require("path");
const cors = require("cors");


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
app.post("/upload",upload.single('product'),async (req,res)=>{//.single('product')表示上传单个文件，字段名为'product'
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`//返回图片的访问地址
    })
})

//Schema for product creation
const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required:true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: false
    },
    old_price:{
        type: Number,
        required: true
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
app.post('/addproduct',async(req,res) => {
        let products = await Product.find({});
        let id;
        if(products.length > 0){
            let last_product = products[products.length - 1];
            id = last_product.id + 1;
        }
        else{
            id = 1; // If no products exist, start IDs at 1
        }
        console.log('req.body:', req.body);
        const product = new Product({
            id: id,
            name: req.body.name,//注意这里的req.body.name是前端传过来的数据
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,   }
        ) 

    console.log(product);
    
    try {
        await product.save();
            console.log("saved");
            return res.json({ success: true, name: product.name });
        } catch (err) {
        console.error('Add product error:', err);
        // Mongo duplicate key error
        if (err && err.code === 11000) {//这是MongoDB的重复键错误代码，我们规定了name唯一，所以会报这个错
            return res.status(409).json({
            success: false,
            message: 'Product already exists',
            duplicate: err.keyValue || null //返回重复的键值对，方便前端显示
            });
        }
        // 其它错误
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
        }
})
app.post('/removeproduct',async(req,res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("deleted product with id:", req.body.id);
    res.json({success: true, name: req.body.name})
})

//creating api to get all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("fetched all products");
    res.send({products});
})

const Users = mongoose.model("Users",{
    username: {    
        type: String,
        required: true,  
    },
    email: {    
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        required: false
    },  
    date:{
        type:Date,
        default:Date.now
    }
}) 
app.post('/signup',async(req,res) => {
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return  res.status(400).json({
            success: false,
            message: 'Email already registered'
        });
    }
    let cart = {};
    for (let i = 0; i < 100; i++){
        cart[i] = 0;
    }
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    }) 
    await user.save();
    const data = {
        id: user.id,
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token: token});
})

app.post('/login',async(req,res) => {
    let user = await Users.findOne({email: req.body.email});
    if(!user || user.password !== req.body.password){
        return res.status(400).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
    const data = {
        id: user.id,
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token: token});
})



app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port");
    }
    else{
        console.log("Error :"+error);
    }
})
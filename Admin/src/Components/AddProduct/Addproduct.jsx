import React from 'react'
import "./Addproduct.css"
import upload_area from '../../Assets/upload_area.svg'

const Addproduct = () => {
    const [image,setImage] = React.useState(null);
    const [produtDetails,setProductDetails] = React.useState({
        name:"",
        old_price:"",
        new_price:"",
        category:"",
    });

    const changeHandler = (e) => {
        setProductDetails({
            ...produtDetails,
            [e.target.name]:e.target.value
        })
    }

    const imageHandler = (e) => { //e 为 event 对象，事件对象，作为例子之一： 在后面的 value = produtDetails.old_price onChange={changeHandler} 中，changeHandler 函数的参数 e 就是事件对象
        const file = e.target.files && e.target.files[0];// targets的意思是文件列表，取第一个DOM，意思是Document Object Model，即文档对象模型https://www.runoob.com/jsref/dom-obj-all.html
        if (!file) return; // 用户取消选择等情况
        const maxBytes = 5 * 1024 * 1024; // 5 MB limit
        // 类型检查
        if (!file.type || !file.type.startsWith('image/')) { 
            alert('请选择图片文件 (image/*)');
            e.target.value = ''; // 清空 input，使用户可以重新选择相同文件
            return;
        }
        // 大小检查
        if (file.size > maxBytes) {
            alert('图片大小不能超过 5MB');
            e.target.value = '';
            return;
        }
        // 通过校验：保存文件（你当前用 setImage(file)）
        setImage(file);
    }; 

    const Add_product = async () => {
        console.log(produtDetails);//测试用，看看produtDetails对象是否正确
        let responseData; //用来存放从后端返回的数据
        let product = produtDetails; //这是引用赋值，所以后面改product的image属性，produtDetails也会变
        let formData = new FormData();//创建一个formdata对象，用来存放要上传的数据
        formData.append('product',image);//把图片数据放进去，key是product，和后端upload.single('product')对应
        await fetch('http://localhost:4000/upload',{ //发起上传请求
            method:'POST',     //用post方法
            headers:{ //注意这里不能设置Content-Type，浏览器会自动设置为 multipart/form-data，并添加正确的 boundary
                Accept:'application/json', //告诉后端我们希望接受json格式的响应
            },
            body:formData, //把formdata对象放到请求体中
        }).then(res => res.json()).then( data => { //把响应解析为json
            responseData = data; //把解析后的数据放到responseData变量中
        }) //注意这里用了await，所以会等上传和解析完成后才继续往下执行
        console.log('Upload response:', responseData); //调试用，看看后端返回了什么
        if(responseData.success){ //如果上传成功
            product.image = responseData.image_url; //把返回的图片url放到product对象的image属性中
            console.log('Final product data to add:', product); //调试用，看看最终要添加的product对象
        }
        await fetch('http://localhost:4000/addproduct',{ //发起添加产品请求
            method:'POST',
            headers:{
                Accept:'application/json',//告诉后端我们希望接受json格式的响应
                'Content-Type':'application/json' //告诉后端我们发送的是json格式的数据
            },
            body:JSON.stringify(product) //把product对象转换为json字符串放到请求体中
        }).then(res => res.json()).then(data => {//把响应解析为json
            data.success?alert('Product added successfully!'):alert('Failed to add product.');
            console.log('Add product response:',data); //调试用，看看后端返回了什么
        });

    }

  return (
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Product Name</p>
            <input value = {produtDetails.name} onChange = {changeHandler} type="text" name='name' placeholder='Enter Robot Name' />
        </div>
        <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
                <p>Price</p>    
                <input value = {produtDetails.old_price} onChange = {changeHandler} stype="number" name='old_price' placeholder='Enter Robot Price' />
            </div>
            <div className='addproduct-itemfield'>
                <p>Discounted Price</p>    
                <input value={produtDetails.new_price} onChange={changeHandler} type="number" name='new_price' placeholder='Enter Discounted Price' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={produtDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="product_type1"> product type1 </option>
                    <option value="product_type2"> product type2 </option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor="file-input" >
                    <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumnail-img' /> 
                </label>
                <input onChange={imageHandler}  type="file" name='image' id='file-input' hidden />
            </div>
        </div>
        <div className='addproduct-submitbtn'>
            <button onClick = {() => Add_product()}className='addproduct-btn'>Add Product</button>
        </div>
        
    </div>
  )
}

export default Addproduct
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
        try {
            if (!image) {//没有选择图片
                alert('Please select an image file.');
                return;
            }
            if (!produtDetails.name || !produtDetails.old_price) {//没有填写名称或价格
                alert('Please fill in all required fields.');
                return;
            }
            if (!produtDetails.category) {//没有选择类别
                alert('please select a product category.');
                return;
            }
            console.log(produtDetails);//打印当前的产品信息，方便调试
            const product = { ...produtDetails };// 拷贝 state，避免直接修改引用
            const formData = new FormData();// 上传图片 formData 对象用于构建一组表示表单字段及其值的键值对，通常用于发送包含文件的表单数据
            formData.append('product', image);//注意这里的'product'要和后端upload.single('product')中的'product'一致
            const uploadRes = await fetch('http://localhost:4000/upload', {// 上传图片
                method: 'POST',
                body: formData,
            });
            if (!uploadRes.ok) { // 上传失败
                const errBody = await uploadRes.json().catch(() => null); // 尝试解析错误响应体
                throw new Error(errBody?.message || `Image upload failed (${uploadRes.status})`);//抛出错误
            }
            const uploadData = await uploadRes.json().catch(() => null);// 解析响应体
            if (!uploadData || !uploadData.image_url) {// 上传响应无效
                throw new Error('Invalid upload response');//抛出错误
            }
            product.image = uploadData.image_url; //将fetch到的图片地址赋值给product对象的image字段
            // 提交商品
            const addRes = await fetch('http://localhost:4000/addproduct', {
            //将product对象发送到后端，把刚刚上传的图片地址也包含进去，回复的信息储存在addRes中
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!addRes.ok) {// 添加商品失败
                const errBody = await addRes.json().catch(() => null);//把addRes中的信息解析成json格式储存在errBody中，catch部分是防止解析失败报错
                if (addRes.status === 409) {
                    alert(errBody.message);//后端返回的错误信息，我们已经写了处理重复商品的message
                    return;
                }
                throw new Error(errBody?.message || `Add product failed (${addRes.status})`);
            }

            const addData = await addRes.json().catch(() => null);
            if (addData && addData.success) {
                alert('Product added successfully!');
            } else {
                alert(addData?.message || 'Failed to add product.');
            }
            console.log('Add product response:', addData);
        } catch (err) {
            console.error('Error adding product:', err);
            alert(err.message || 'Network or server error. Please try again.');
        }
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
                <select name="category" value={produtDetails.category} onChange={changeHandler} className='add-product-selector'>
                    <option value="">please select robot type</option>
                    <option value="product_type1">product type1</option>
                    <option value="product_type2">product type2</option>
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
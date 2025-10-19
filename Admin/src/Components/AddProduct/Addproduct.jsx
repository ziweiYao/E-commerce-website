import React from 'react'
import "./Addproduct.css"
import upload_area from '../../Assets/upload_area.svg'

const Addproduct = () => {
  return (
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Product Name</p>
            <input type="text" name='name' placeholder='Enter Robot Name' />
        </div>
        <div className='addproduct-price'>
            <div className='addproduct-itemfeild'>
                <p>Price</p>    
                <input type="number" name='old_price' placeholder='Enter Robot Price' />
            </div>
            <div className='addproduct-itemfeild'>
                <p>Discounted Price</p>    
                <input type="number" name='new_price' placeholder='Enter Discounted Price' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category">
                    <option value="product_type1"> product type1 </option>
                    <option value="product_type2"> product type2 </option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor="file-input" >
                    <img src={upload_area} alt="" className='addproduct-thumnail-img' />
                </label>
                <input type="file" name='image' id='file-input' hidden />
            </div>
        </div>
        <div className='addproduct-submitbtn'>
            <button className='addproduct-btn'>Add Product</button>
        </div>
        
    </div>
  )
}

export default Addproduct
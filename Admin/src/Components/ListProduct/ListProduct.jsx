import React from 'react'
import "./ListProduct.css"
import { use } from 'react';
import { useEffect } from 'react';
import cross_icon from '../../Assets/cross_icon.png'
const ListProduct = () => {

    const [allProducts,setAllProducts] = React.useState([]); //用来存放所有产品数据的状态

    const fetchInfo = async () => {
      await fetch('http://localhost:4000/allproducts')
        .then(res => res.json())
        .then(data => {
          setAllProducts(data.products|| []); // 取出 products 数组
          console.log('All products data:', data);
        });
    }

    useEffect(() => {
      fetchInfo(); //组件加载时获取产品数据
    } , []); //空依赖数组表示只在组件挂载时执行一次

  return (
    <div className='list-product'>
        <h1>All Product List</h1>
        <div className='lsitproduct-format-main'>
          <p>Products</p>
          <p>Title</p>
          <p>Old price</p>
          <p>New price</p>
          <p>remove</p>
        </div>
        <div className='listproduct-allproducts'>
          <hr/>
          {allProducts.map( (product) => { //遍历所有产品数据，生成对应的显示元素
              return (<div key={product.id} className='listproduct-format-main listproduct-format'>
                  <img src={product.image} alt="" className="lsitproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img className='listproduct-remove-icon' src = {cross_icon} alt = ''/>
                  <button className='listproduct-remove-btn'>Remove</button>
                  <hr/>
                </div>)
            })}
        </div>
    </div>
  )
}

export default ListProduct
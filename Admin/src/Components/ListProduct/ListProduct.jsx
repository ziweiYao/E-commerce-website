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
      fetchInfo(); //组件加载时获取产品数据，换句话说就是刷新数据，显示最新的产品列表
    } , []); //空依赖数组表示只在组件挂载时执行一次

    const removeProduct = async (id) => {
      await fetch(`http://localhost:4000/removeproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Remove product response:', data);
        fetchInfo(); //刷新产品列表
      });
    }
  return (
    <div className='listproduct'>
        <h1>All Product List</h1>
        <div className='listproduct-format-main'>
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
                  <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className='listproduct-cross-icon' />
                  <hr/>
                </div>)
            })}
        </div>
    </div>
  )
}

export default ListProduct
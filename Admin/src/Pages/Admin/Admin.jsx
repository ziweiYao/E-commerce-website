import React from 'react'
import "./Admin.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Addproduct from '../../Components/AddProduct/Addproduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

//routes 用来定义路由容器，route用来定义具体的路由规则
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default Admin
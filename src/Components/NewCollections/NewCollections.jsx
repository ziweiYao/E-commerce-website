import React from 'react'
import './NewCollections.css'
import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'
const NewCollections = () => {
  return (
    <div className="new-collections">
      <h1>new collections<hr/></h1>
      <div className="collections">
          {
            new_collections.map((item) => {
              return <Item key = {item.id} name = {item.name} image = {item.image} />
            })
          }
      </div>
    </div>
  )
}

export default NewCollections
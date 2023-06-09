import React from 'react'
import Item from "./Item"
import styles from  "./Items.module.css"
import { useSelector } from 'react-redux'

function Items() {

  let items = useSelector(state=> state.menuItems)

 
  return (
    <div className={styles.items}>
      {items.map((item) => <Item key={item.id} {...item}/>)}
    </div>
  )
}

export default Items
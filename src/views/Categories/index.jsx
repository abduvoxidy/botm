import styles from "./style.module.scss"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreateButton from '../../components/Buttons/CreateButton'
import Header from '../../components/Header'
import CategoryTable from "./CategoryTable"

export default function index() {
    const navigate = useNavigate()
  return (
    <div className={styles.categoryTable}>
        <Header
            title='List of Categories'
            extra={
                <CreateButton
                    onClick={()=> navigate("/category/create")}
                    title="Create category"
                 />
            }
         />

         <div className={styles.mainSection}>
               <CategoryTable /> 
         </div>
    </div>
  )
}

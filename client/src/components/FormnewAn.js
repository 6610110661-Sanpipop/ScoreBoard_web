import React, { useState } from 'react'
import './FormComponent.css'
function FormnewAn(props) {
    const [NewAn,setNewAn] = useState('')

    const inputTitle = (event) =>{
        setNewAn(event.target.value)
    }
    const saveItem = (event) =>{
        event.preventDefault() //eventใช้แค่ไม่ให้จอรีเฟรช
        if (NewAn!==''){
            const itemData = {
                NewAn : NewAn,
            }
            console.log('itemdata',itemData)
            props.onAddnewAn(itemData.NewAn)
            setNewAn('')//ดึงข้อมูลมาแล้วก็เคลียค่าstateทิ้ง
        }else{
            alert('กรุณาใส่ชื่อประกาศ')
        }
        
    }
  return (
    <div>
        <form onSubmit={saveItem}>
            <div className='form-control'>
                <label>สร้างประกาศใหม่ : </label>
                <input type='text' placeholder='ระบุชื่อประกาศของคุณ' onChange={inputTitle} value={NewAn}/>
            </div>
            <div>
                <button type='submit' className='btn'>สร้าง</button>
            </div>
        </form>
    </div>
  )
}

export default FormnewAn
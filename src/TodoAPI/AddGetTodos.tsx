import React, { useEffect, useState, ChangeEvent} from 'react';
import { useParams } from 'react-router-dom';
import styles from '@asset/App.module.css'
import InputWithLabel from '@root/forms/InputWithLabel';
import axios from 'axios';


export default function AddGetTodos ({setTodos}) {
  const [values, setValues] = useState({
    title: "",
    content: "",
  })

  function handleChange (e: ChangeEvent<HTMLInputElement>): void{
    setValues({
      ...values, 
      [e.target.name] : e.target.value})
}
console.log(values);


const handleAdd = async (e: ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  const url ="http://localhost:5051/api/v1/todos"
  const token: {token: string } | null = JSON.parse(localStorage.getItem("userToken") || "null")

  try {
    const { title, content } = values

    const {data} = await axios.post(url, 
      {
        title,
        content
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(data);
    setTodos(data.todo)
    

  } catch (error) {
    console.log(error);
}
}
return (
<>
<form 
        className={styles.form}
        id="form" 
        onSubmit={handleAdd}
        >
            <div>
            Title
            <InputWithLabel 
           onChange={handleChange} id="title" name="title" title="title" >
            </InputWithLabel>
      
              </div>
              <div>
                Content
              <InputWithLabel 
            
            onChange={handleChange}  id="content" name="content" title="content" >
            </InputWithLabel>
            
              </div>

             <button 
             type="submit">
              Add
             </button> 

        </form>
</>
)
}


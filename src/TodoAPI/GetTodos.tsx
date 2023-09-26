import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '@asset/App.module.css'
import AddGetTodos from "./AddGetTodos"

const GetTodos = () => {
    const [todos, setTodos] = useState([])
    
    useEffect(() => {
        fetchTodos()
    }, [])



    const fetchTodos = async () => {
      const url ="http://localhost:5051/api/v1/todos"
      const token: {token: string } | null = JSON.parse(localStorage.getItem("userToken") || "null")

      try {

        const {data} = await axios.get(url, 
        {
          headers: {     
            Authorization: `Bearer ${token}`, },
        }
        )
        setTodos(data.todos)
  
      } catch (error) {
        console.log(error);
    }
  }


  

    return (
    <>
           <div className={styles.body} >
        <div className={styles.wrapHead} >
        </div>
        <header>
        <div className={styles.wrap}>
        <AddGetTodos  setTodos={setTodos} />

        </div>

        </header>

        <main>
          <div className={styles.todoList}>
                <h2>Task</h2>
                { todos ? todos.map((todo) => (
            <div key={todo._id} className={styles.lists}>
            <div className={styles.list}> 
                <span className={styles.title} >{todo.title} </span>
            </div>
          </div>
            )) : null }
          </div>

        </main>
        </div>



    </>
    )
}

export default GetTodos



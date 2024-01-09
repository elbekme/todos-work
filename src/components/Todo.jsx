// import React from 'react'

const Todo = ({todo, }) => {

  return (
    <div>
        <h4>{todo.title}</h4>
        <h5>completed: {todo.complete}</h5>
    </div>
  )
}

export default Todo
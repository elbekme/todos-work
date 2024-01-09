// import React from 'react'

import Todo from "./Todo"

const TodosList = ({fetchData, todos, errorMsg, loading}) => {

  return (
    <div>
        {todos.length > 0 
        ? todos.map((todo) => (
            <Todo key={todo.id} todo={todo}/>
        ))
    : null}
    {errorMsg ? <h2>{errorMsg}</h2> :null}
    </div>
  )
}

export default TodosList

import { useEffect, useState } from 'react'
import axios from 'axios';
import TodosList from '../components/TodosList';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
      fetchTodos();
    }, []);
  
    const fetchTodos = async () => {
        setLoading(true);
      try{
        const res = await axios('https://jsonplaceholder.typicode.com/todos');
        setTodos(res.data);
        console.log(res.data);
        setLoading(false);
      }catch(err){
        setErrorMsg(err.message);
        console.log(err.message);
        setLoading(false);
      }
    }

  return (
    <div>
        <h1>Todos</h1>
        <TodosList fetchTodos={fetchTodos} loading={loading} errorMsg={errorMsg}  todos={todos}/> 
    </div>
  )
}

export default Todos
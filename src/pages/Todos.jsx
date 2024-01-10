import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';

import TodosList from '../components/TodosList';
import ModalTodo from '../components/ModalTodo';
import AddTodos from '../components/AddTodos';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);
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

    const addTodo = async (todo) => {
      setLoading(true);
      try{
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos',todo);
        console.log(res.data);
        fetchTodos();
        setLoading(false)
      } catch(err){
        console.log(err.message);
        setLoading(false);
      }
  };


    const deleteTodo = async (id) => {
      setLoading(true);
      console.log(id);
      if(window.confirm('Are you sure you want to delete')){
        try{
          await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
          fetchTodos();
          setLoading(false);
        } catch(err){
          console.log(err.message);
          setLoading(false);
        }
      }
    };

  return (
    <div className='mt-4 mb-5'>
        <div className="row mb-5 text-center">
          <h1 style={{fontFamily: 'sans-serif',  fontWeight: 'bold'}}>Todos</h1>
          <Button className='py-2' onClick={() => setShow(true)}>Add Todo</Button>
        </div>
        <ModalTodo show={show} setShow={setShow}>
            <AddTodos loading={loading}  addTodo={addTodo} setShow={setShow}/>
        </ModalTodo>
        <TodosList fetchTodos={fetchTodos} addTodo={addTodo} deleteTodo={deleteTodo} loading={loading} errorMsg={errorMsg}  todos={todos}/> 
    </div>
  )
}

export default Todos
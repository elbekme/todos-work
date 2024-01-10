
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import TodosList from '../components/TodosList';
import ModalTodo from '../components/ModalTodo';
import AddTodos from '../components/AddTodos';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTodos = async () => {
    setLoading(true);
    try {
      let apiRes = await axios('https://jsonplaceholder.typicode.com/todos');
      console.log(apiRes.data);

      setTodos(apiRes.data);
      setLoading(false);
    } catch (err) {
      setErrorMsg(err.message);
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    setLoading(true);
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
      console.log(res.data);
      fetchTodos();
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        fetchTodos();
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='mt-4 mb-5'>
      <div className="row mb-4 px-3 text-center">
        <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Todos</h1>
        <div className="mb-3">
          <input type="text" placeholder="Search todos" value={searchQuery} onChange={(e) => handleSearch(e.target.value)}
            style={{padding: '5px 0 5px 20px', fontSize: '18px', borderRadius: '7px', width: '100%'}}
          />
        </div>
        <Button className='py-2' onClick={() => setShow(true)}>Add Todo</Button>
      </div>
      <ModalTodo show={show} setShow={setShow}>
        <AddTodos loading={loading} addTodo={addTodo} setShow={setShow} fetchTodos={fetchTodos} />
      </ModalTodo>
      <TodosList todos={filteredTodos} fetchTodos={fetchTodos} addTodo={addTodo} deleteTodo={deleteTodo} loading={loading} errorMsg={errorMsg} />
    </div>
  );
}

export default Todos;
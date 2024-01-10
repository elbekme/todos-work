import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// eslint-disable-next-line react/prop-types
const TodosList = ({ todos, deleteTodo, loading }) => {
  const todosPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  // eslint-disable-next-line react/prop-types
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div style={{textAlign:'center', paddingTop: 'calc(15% - 10px)'}}>
      <Spinner size='xs'  animation="border" variant="primary" />
    </div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.length > 0 ? (
            currentTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td style={{ display: 'flex', gap: '15px' }}>
                  <Button variant="warning">Edit</Button>
                  <Button onClick={() => deleteTodo(todo.id)} variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No todos found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {todos.length > todosPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(todos.length / todosPerPage) }).map(
            (_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'primary' : 'light'}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            )
          )}
        </div>
      )}

      
    </div>
  );
};

export default TodosList;
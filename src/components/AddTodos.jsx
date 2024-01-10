import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const AddTodos = ({ addTodo, setShow, loading, fetchTodos }) => {
  const [todo, setTodo] = useState({
    title: "",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo({
      title: "",
    });
    setShow(false);
    fetchTodos();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "calc(15% - 10px)" }}>
        <Spinner size="xs" animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="d-flex justify-content-end gap-2 mt-2">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodos;


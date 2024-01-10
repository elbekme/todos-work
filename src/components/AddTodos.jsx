import { useState } from "react"
import { Button, Spinner } from "react-bootstrap"

const AddTodos = ({addTodo, setShow, loading}) => {
    const [todo,setTodo] = useState({
        title: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);
        setTodo({
            title: '',
        });
        setShow(false);
    };
    if (loading) {
        return <div style={{textAlign:'center', paddingTop: 'calc(15% - 10px)'}}>
          <Spinner size='xs'  animation="border" variant="primary" />
        </div>;
      }
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Title</label>
                <input type="text" name="title" id="title" className="form-control" value={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            </div>
            {/* <div className="form-group">
                <label className="form-label" htmlFor="completed">Completed</label>
                <input type="text" name='completed' id='completed' className="form-control"
                value={todo.completed} onChange={(e)=> setTodo({...todo, female: e.target.value})}/>
            </div> */}
            <div className="d-flex justify-content-end gap-2 mt-2">
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="primary" type='submit'>Save</Button>
            </div>
        </form>
    </div>
  )
}

export default AddTodos

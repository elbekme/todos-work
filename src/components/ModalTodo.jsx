import { Modal } from "react-bootstrap"

const ModalTodo = ({show, setShow, children}) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
        <Modal.Title>New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalTodo
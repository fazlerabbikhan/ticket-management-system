import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Toggle } from "rsuite";
import "../App.css";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { BaseUser, User } from "./Interface";

export const Menu = () => {
  const defaultUsers = [
    {
      id: 1,
      type: "Internet Issue",
      description: "Internet not connecting or slow"
    },
    {
      id: 2,
      type: "Printer Issue",
      description: "Uneven color printer"
    },
    {
      id: 3,
      type: "Software Activation",
      description: "Microsoft Office activation"
    },
    {
      id: 4,
      type: "Password Change Request",
      description: "Forgot password or need to change password"
    }
  ];

  const initCurrentTicket = {
    id: null,
    type: "",
    description: "",
  };

  const [users, setUsers] = useState(defaultUsers);
  const [show, setShow] = useState(false);
  const [newTicket, setnewTicket] = useState(initCurrentTicket);
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const [editing, setEdit] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    if (editing == false) {
      setnewTicket(initCurrentTicket);
    }
  };

  const onFormSubmit = (newTicket: any) => {
    const id = users.length + 1;
    setUsers([...users, { ...newTicket, id }]);
  };

  const onEdit = (newTicket: any) => {
    setEdit(true);
    if (editing == true) {
      setnewTicket({ ...newTicket, newTicket });
      handleShow();
    }

  };

  const onSubmit = (newTicket: any) => {
    if (editing === true) {
      onUpdateUser(newTicket);
    } else {
      onFormSubmit(newTicket);
    }
  };

  const onUpdateUser = (newTicket: User) => {
    setEdit(false);
    let id = newTicket.id;
    setUsers(users.map((i) => (i.id === id ? newTicket : i)));
  };

  const onDeleteUser = (currentUser: User) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard">
            <Card.Body>
              <div className="d-flex justify-content-between customCardBody">
                <div>
                  <Card.Title>Ticket Data</Card.Title>
                </div>
                <div className="d-flex">
                  <Toggle
                    className="userToggleBtn"
                    checked={showCreateBtn}
                    onClick={(e: any) => {
                      e.preventDefault();
                      setShowCreateBtn(!showCreateBtn);
                    }}
                  />
                  {showCreateBtn ? (
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      title="Add User"
                    >
                      <FaPlus />
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ticket Type</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.type}</td>
                        <td>{user.description}</td>
                        <td>
                          <Button
                            variant="info"
                            title="Edit user details"
                            onClick={() => onEdit(user)}
                          >
                            <FaPencilAlt />
                          </Button>{" "}
                          <Button
                            variant="danger"
                            title="Delete user"
                            onClick={() => onDeleteUser(user)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No ticket found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal size="lg" show={show} onHide={handleClose}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(newTicket);
              }}
            >
              <Modal.Header closeButton>
                {
                  editing == true
                    ? <Modal.Title>Edit Ticket</Modal.Title>
                    : <Modal.Title>Add Ticket</Modal.Title>
                }
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Ticket Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTicket.type}
                    required
                    onChange={(e) =>
                      setnewTicket({ ...newTicket, type: e.target.value })
                    }
                    placeholder="Enter Ticket Type"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTicket.description}
                    onChange={(e) =>
                      setnewTicket({ ...newTicket, description: e.target.value })
                    }
                    placeholder="Enter Description"
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {editing === true ? (
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Update
                  </Button>
                ) : (
                  <Button variant="primary" disabled={!newTicket.type} type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

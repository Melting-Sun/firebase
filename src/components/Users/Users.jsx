import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Users() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setrUserId] = useState("");
  const [getData, setGetData] = useState(false);
  const [firstNameData, setFirstNameData] = useState("");
  const [lastNameData, setLastNameData] = useState("");
  const [emailData, setEmailData] = useState("");

  useEffect(() => {
    fetch("https://elearn-6691d-default-rtdb.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(Object.entries(data));
        setUsers(Object.entries(data));
      });
  }, [getData]);


  useEffect(() => {
    let mainUserInfo = users.find(user => user[0] == userId)
    if(mainUserInfo){
      setFirstNameData(mainUserInfo[1].firstName)
      setLastNameData(mainUserInfo[1].lastName)
      setEmailData(mainUserInfo[1].email)
    }

    console.log(mainUserInfo);
  }, [userId])

  const removeHandler = async () => {
    await fetch(
      `https://elearn-6691d-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => console.log(res));

    console.log(userId);
    setshowDeleteModal(false);
    setGetData((prev) => !prev);
  };

  const editHandler = async () => {
    console.log("edited");
    let newUser = {
      firstName: firstNameData,
      lastName: lastNameData,
      email: emailData,
    };

   await fetch(
      `https://elearn-6691d-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newUser),
      }
    ).then((res) => console.log(res));

    setShowEditModal(false);
    setGetData((prev) => !prev);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user[1].firstName}</td>
              <td>{user[1].lastName}</td>
              <td>{user[1].email}</td>
              <td style={{ display: "flex", justifyContent: "space-between" }}>
                <AiFillDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setshowDeleteModal(true);
                    setrUserId(user[0]);
                  }}
                />
                <AiFillEdit
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowEditModal(true);
                    setrUserId(user[0]);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      {/* delete modal */}
      <Modal
        show={showDeleteModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Deleting User</h4>
          <p>Are You Sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setshowDeleteModal(false)}>Close</Button>
          <Button onClick={() => removeHandler()}>Yes</Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal */}

      <Modal
        show={showEditModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>FirstName: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter FirstName"
                onChange={(event) => setFirstNameData(event.target.value)}
                value={firstNameData}
              
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>LastName: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter LastName"
                onChange={(event) => setLastNameData(event.target.value)}
                value={lastNameData}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => setEmailData(event.target.value)}
                value={emailData}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowEditModal(false)}>Close</Button>
          <Button onClick={() => editHandler()}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;

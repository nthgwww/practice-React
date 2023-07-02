import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";

function App() {
  const [isShowModalAddNew, SetIsShowModalAddNew] = useState(false)

  const handleClose = () =>{
    SetIsShowModalAddNew(false)
  }
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new ">
          <span><b>List Users:</b></span>
          <button className="btn btn-success" onClick={()=>SetIsShowModalAddNew(true)}>Add New User</button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew 
      show = {isShowModalAddNew}
      handleClose = {handleClose}
      />
    </div>
  );
}

export default App;

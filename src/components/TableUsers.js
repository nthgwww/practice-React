// import axios from 'axios';
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { featchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { clone, debounce } from 'lodash';
import TableUser from "./TableUser.scss";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalDelete, setIsShowModalDelete] = useState(false); 
  const [dataUserDelete, setDataUserDelete] = useState({});

  const[ isShowModalEdit, setIsShowModalEdit] = useState(false);
  const[dataUserEdit, setDataUserEdit] =useState({});

  const [sortBy, setSortBy] = useState("asc")
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  }

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    // cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  }

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await featchAllUser(page);
    // console.log(">>> check new res: ", res)
    if (res && res.data) {
      console.log(res);
      setTotalUsers(res.total);
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    console.log(user)
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  }
 
  const handleDeleteUser = (user)=> {
    setIsShowModalDelete(true);
    setDataUserDelete(user)
    console.log(user)
  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setListUsers(cloneListUsers);
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers)
    // console.log(cloneListUsers)
  }
   
  console.log(">>> check sort:", sortBy, sortField)

  const handleSearch=debounce((event)=> {
    let term = event.target.value
    console.log(event.target.value)
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
      console.log(cloneListUsers)
      setListUsers(cloneListUsers);
    }else{
      getUsers(1);
    }
  }, 500)

  return (
    <>
      <div className="my-3 add-new ">
        <span>
          <b>List Users:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add New User</button>
      </div>
      <div className="col-4 my-3">
        <input className="form-control" placeholder="Search user by email ...." 
        // value={keyword}
         onChange={(event) => handleSearch(event)}/>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th >
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i className="fa-solid fa-arrow-down-long" onClick={()=>handleSort("desc","id")}></i>
                  <i className="fa-solid fa-arrow-up-long" onClick={()=> handleSort("asc","id")}></i>
                </span>
              </div>
            </th>
            <th >Email</th>  
            <th >
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i className="fa-solid fa-arrow-down-long" onClick={()=>handleSort("desc","first_name")}></i>
                  <i className="fa-solid fa-arrow-up-long" onClick={()=> handleSort("asc","first_name")}></i>
                </span>
              </div>
            </th>
            <th >Last Name</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className="btn btn-warning mx-3" onClick={()=>handleEditUser(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>handleDeleteUser(item)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable}/>
      <ModalEditUser show={isShowModalEdit} dataUserEdit={dataUserEdit} handleClose={handleClose} handleEditUserFromModal={handleEditUserFromModal}/>
      <ModalConfirm show = {isShowModalDelete } handleClose={handleClose} dataUserDelete={dataUserDelete} handleDeleteUserFromModal={handleDeleteUserFromModal}/>
    </>
  );
};

export default TableUsers;

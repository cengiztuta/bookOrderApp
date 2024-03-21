import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
const BookList = (props) => {
  const admin = localStorage.getItem("role") === "admin";

  return (
    <List hasCreate={admin ? true : false}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="author" />
        <TextField source="pageNum" />
        <TextField source="ISBN" />
        {admin ? <EditButton /> : null}
        {admin ? <DeleteButton /> : null}
      </Datagrid>
    </List>
  );
};

export default BookList;

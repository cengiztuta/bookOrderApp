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
        <TextField source="userId" />
        <TextField source="email" />
        <TextField source="password" />
      </Datagrid>
    </List>
  );
};

export default BookList;

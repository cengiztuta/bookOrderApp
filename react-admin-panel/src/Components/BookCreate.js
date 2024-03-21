import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  TextInput,
  NumberField,
  SimpleForm,
  DateInput,
  EditButton,
  DeleteButton,
  NumberInput,
} from "react-admin";

const BookCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput disabled source="_id" label="id" />
        <TextInput source="title" label="Title" />
        <TextInput source="author" label="Author" multiline />
        <NumberInput source="pageNum" label="Page Number" />
        <TextInput source="ISBN" label="ISBN" />
      </SimpleForm>
    </Create>
  );
};

export default BookCreate;

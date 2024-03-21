import React from "react";
import { Edit, TextInput, SimpleForm, NumberInput } from "react-admin";
const BookEdits = (props) => {
  return (
    <Edit {...props} title="Edit a Book">
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="author" />
        <TextInput source="pageNum" />
        <TextInput source="ISBN" />
      </SimpleForm>
    </Edit>
  );
};

export default BookEdits;

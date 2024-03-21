import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  NumberField,
  ArrayField,
} from "react-admin";

const OrdersList = (props) => {
  const admin = localStorage.getItem("role") === "admin";
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="orderId" />
        <TextField source="email" />
        <ArrayField source="basket">
          <Datagrid>
            <TextField source="bookTitle" label="Book Title" />
            <TextField source="bookAuthor" label="Book Author" />
            <NumberField source="bookPrice" label="Book Price" />
          </Datagrid>
        </ArrayField>
        <TextField source="status" />
        <TextField source="createdAt" />
        <NumberField source="totalPrice" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default OrdersList;

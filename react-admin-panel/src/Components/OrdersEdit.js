import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  SelectInput,
} from "react-admin";

const OrdersEdit = (props) => {
  const statusChoices = [
    { id: "processing", name: "Processing" },
    { id: "Delivered", name: "Delivered" },
    { id: "cancelled", name: "Cancelled" },
    { id: "Accepted", name: "Accepted" },
  ];
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="orderId" disabled />
        <TextInput source="email" disabled />
        <ArrayInput source="basket">
          <SimpleFormIterator>
            <TextInput source="bookTitle" label="Book Title" />
            <TextInput source="bookAuthor" label="Book Author" />
            <NumberInput source="bookPrice" label="Book Price" />
          </SimpleFormIterator>
        </ArrayInput>{" "}
        <SelectInput source="status" choices={statusChoices} />
        <TextInput source="createdAt" disabled />
        <NumberInput source="totalPrice" />
      </SimpleForm>
    </Edit>
  );
};

export default OrdersEdit;

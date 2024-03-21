import React from "react";
import { Admin, DeleteButton, Resource } from "react-admin";
import MyLoginPage from "./LoginPage";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import MyLogoutButton from "./LogOutButton";
import BookList from "./Components/BookList";
import BookCreate from "./Components/BookCreate";
import BookEdits from "./Components/BookEdits";
import OrdersList from "./Components/OrdersList";
import UsersList from "./Components/UsersList";
import OrdersEdit from "./Components/OrdersEdit";
const admin = localStorage.getItem("role") === "admin";
// try commit
const App = () => (
  <Admin
    loginPage={MyLoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    logoutButton={MyLogoutButton}
  >
    <Resource
      name="books"
      list={BookList}
      edit={admin ? BookEdits : null}
      create={admin ? BookCreate : null}
      delete={DeleteButton}
    />
    <Resource name="orders" list={OrdersList} edit={OrdersEdit} />
    <Resource name="users" list={UsersList} />
  </Admin>
);

export default App;

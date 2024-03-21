
import React from "react";
import { useLogout, useNotify } from "react-admin";

const MyLogoutButton = (props) => {
  const logout = useLogout();
  const notify = useNotify();

  const handleLogout = () => {
    logout().then(() => {
      notify("Logged out successfully");
    });
  };

  return (
    <button onClick={handleLogout} {...props}>
      Logout
    </button>
  );
};

export default MyLogoutButton;

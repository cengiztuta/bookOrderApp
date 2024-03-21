import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin, useNotify } from "react-admin";

const MyLoginPage = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const login = useLogin();
  const notify = useNotify();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login({ username: data.username, password: data.password });
      notify("Logged in successfully");
    } catch (error) {
      notify("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 360 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input type="text" {...register("username")} />

        <label>Password</label>
        <input type="password" {...register("password")} />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default MyLoginPage;

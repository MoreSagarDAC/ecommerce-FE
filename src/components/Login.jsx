import React from "react";
import TextInput from "../framework/TextInput";
import Button from "../framework/Button";
import styles from "./Login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/user.schema";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { encryptEmail, encryptPassword } from "../utils/encryption";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/user-services.js";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const loginExistingUser = useCallback(
    async (data) => {
      try {
        const encryptedData = {
          ...data,
          email: encryptEmail(data.email),
          password: encryptPassword(data.password),
        };
        const response = await loginUser(encryptedData);
        if (response) {
          dispatch(login(response?.user));
          sessionStorage.setItem("token", response?.user?.token);
          navigate("/home");
          reset();
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [dispatch, navigate, reset],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit(loginExistingUser)} className={styles.form}>
        <div className={styles.inputGroup}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                placeholder="Enter your email"
              />
            )}
          />
        </div>

        <div className={styles.inputGroup}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextInput
                {...field}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </div>
        <div className={styles.inputGroup}>
          <p className={styles.registerLink}>
            <Link to="/register"> Don't have an account? Register</Link>
          </p>
        </div>
        <div className={styles.submitButton}>
          <Button
            type="submit"
            label="Login"
            color="black"
            fullWidth={true}
            sx={{ justifyContent: "center" }}
            onClick={(e) => {
              handleSubmit(loginExistingUser)(e);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

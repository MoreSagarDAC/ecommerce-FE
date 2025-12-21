import React from "react";
import TextInput from "../framework/TextInput";
import NumberInput from "../framework/NumberInput";
import Button from "../framework/Button";
import { useForm, Controller } from "react-hook-form";
import userSchema from "../validation/user.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.css";
import { registerUser } from "../services/user-services";
import { useNavigate } from "react-router-dom";
import { encryptEmail, encryptPassword } from "../utils/encryption";
import { Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const encryptedData = {
        ...data,
        email: encryptEmail(data.email),
        password: encryptPassword(data.password),
      };
      const response = await registerUser(encryptedData);
      if (response.status === 200) {
        reset();
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                required
                placeholder="Enter your name"
              />
            )}
          />
        </div>

        <div className={styles.inputGroup}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                type="email"
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
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                required
                placeholder="Enter your password"
              />
            )}
          />
        </div>

        <div className={styles.inputGroup}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <NumberInput
                {...field}
                label="Phone"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
                placeholder="Enter your phone number"
              />
            )}
          />
        </div>
        <div className={styles.inputGroup}>
          <p className={styles.loginLink}>
            <Link to="/login"> Already have an account? Login</Link>
          </p>
        </div>
        <div className={styles.submitButton}>
          <Button
            type="submit"
            label="Register"
            color="black"
            fullWidth={true}
            sx={{ justifyContent: "center" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;

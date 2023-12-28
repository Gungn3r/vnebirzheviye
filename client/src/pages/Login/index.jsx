import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { UserService } from "../../services";

export const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      console.log(values)
      const response = await UserService.login(values);
      const token = response.data.token

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.error("Login failed", error.message);

      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["input-group"]}>
          <label htmlFor="email">Почта:</label>
          <input
            type="email"
            id="email"
            placeholder="Введите вашу почту"
            {...register("email_1", {
              required: "Почта обязательна для заполнения",
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            placeholder="Введите ваш пароль"
            {...register("password", {
              required: "Пароль обязателен для заполнения",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={!isValid}>
          Войти
        </button>
      </form>

      {/* Показываем сообщение об ошибке, если оно есть */}
      {error && <p className={styles.error}>{error}</p>}

      <p>
        Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

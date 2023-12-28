import React, { useState } from "react";
import styles from "./Registration.module.scss";
import { useForm } from "react-hook-form";
import { UserService } from "../../services";
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const navigate = useNavigate()

  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    try {
      const response = await UserService.register(data);
      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      setError("Произошла ошибка при регистрации");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["registration-container"]}
    >
      <div className={styles["registration-column"]}>
        <h2>Регистрация</h2>

        {/* Дата регистрации */}
        <div className="input-group">
          <label htmlFor="registrationDate">Дата регистрации:</label>
          <input
            type="text"
            id="registrationDate"
            defaultValue={new Date().toLocaleDateString()}
            readOnly
            {...register("registrationDate")}
          />
        </div>

        {/* Резидент */}
        <div className="input-group">
          <label htmlFor="resident">Резидент:</label>
          <input
            {...register("resident")}
            type="checkbox"
            id="resident"
            defaultChecked
          />
        </div>

        {/* Наименование компании */}
        <div className="input-group">
          <label htmlFor="companyName">Наименование компании:</label>
          <input
            type="text"
            id="companyName"
            placeholder="Введите наименование компании"
            {...register("name_company")}
          />
        </div>

        {/* БИН */}
        <div className="input-group">
          <label htmlFor="bin">БИН:</label>
          <input
            type="text"
            id="bin"
            placeholder="Введите БИН"
            {...register("bin")}
          />
        </div>

        {/* Юридический адрес */}
        <div className="input-group">
          <label htmlFor="registered_address">registered_address:</label>
          <input
            type="text"
            id="registered_address"
            placeholder="Введите юридический адрес"
            {...register("registered_address")}
          />
        </div>

        {/* Фактический адрес */}
        <div className="input-group">
          <label htmlFor="actual_address">actual_address:</label>
          <input
            type="text"
            id="actual_address"
            placeholder="Введите фактический адрес"
            {...register("actual_address")}
          />
        </div>

        {/* Почта */}
        <div className="input-group">
          <label htmlFor="email">Почта 1:</label>
          <input
            type="text"
            id="email"
            placeholder="Введите почту"
            {...register("email_1")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email_2">Почта 2:</label>
          <input
            type="text"
            id="email_2"
            placeholder="Введите почту"
            {...register("email_2")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email_3">Почта 3:</label>
          <input
            type="text"
            id="email_3"
            placeholder="Введите почту"
            {...register("email_3")}
          />
        </div>

        {/* Номер телефона */}
        <div className="input-group">
          <label htmlFor="phone">Номер телефона:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Введите номер телефона"
            {...register("phone")}
          />
        </div>

        {/* Role */}
        <div className="input-group">
          <label htmlFor="role">ROLE:</label>
          <select id="role" {...register("role")}>
            <option value="USER">user</option>
            <option value="ADMIN">admin</option>
          </select>
        </div>

        {/* Придумать пароль */}
        <div className="input-group">
          <label htmlFor="password">Придумать пароль:</label>
          <input
            type="password"
            id="password"
            placeholder="Придумайте пароль"
            {...register("password")}
          />
        </div>

        {/* Номер счета */}
        <div className="input-group">
          <label htmlFor="accountNumber">Номер счета:</label>
          <input
            type="text"
            id="accountNumber"
            placeholder="Введите номер счета"
            {...register("account_number")}
          />
        </div>

        {/* Наименование банка */}
        <div className="input-group">
          <label htmlFor="name_of_the_bank">Наименование банка:</label>
          <input
            type="text"
            id="name_of_the_bank"
            placeholder="Введите наименование банка"
            {...register("name_of_the_bank")}
          />
        </div>

        {/* БИК */}
        <div className="input-group">
          <label htmlFor="bik">БИК:</label>
          <input
            type="text"
            id="bik"
            placeholder="Введите БИК"
            {...register("bik")}
          />
        </div>

        {/* КБе */}
        <div className="input-group">
          <label htmlFor="kbe">КБе:</label>
          <input
            type="text"
            id="kbe"
            placeholder="Введите КБе"
            {...register("kbe")}
          />
        </div>

        {/* Корр. счет */}
        <div className="input-group">
          <label htmlFor="kor_count">Корр. счет:</label>
          <input
            type="text"
            id="kor_count"
            placeholder="Введите корр. счет"
            {...register("kor_count")}
          />
        </div>

        {/* Дополнительная информация */}
        <div className="input-group">
          <label htmlFor="additional_information">
            Дополнительная информация:
          </label>
          <textarea
            id="additional_information"
            placeholder="Введите дополнительную информацию"
            {...register("additional_information")}
          />
        </div>
      </div>

      {/* Вторая колонка */}
      <div className={styles["registration-column"]}>
        {/* ФИО руководителя */}
        <div className="input-group">
          <label htmlFor="name_of_manager">ФИО руководителя:</label>
          <input
            type="text"
            id="name_of_manager"
            placeholder="Введите ФИО руководителя"
            {...register("name_of_manager")}
          />
        </div>

        {/* Должность руководителя */}
        <div className="input-group">
          <label htmlFor="management_position">Должность руководителя:</label>
          <input
            type="text"
            id="management_position"
            placeholder="Введите должность руководителя"
            {...register("management_position")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="contract_currency">contract_currency:</label>
          <select id="contract_currency" {...register("contract_currency")}>
            <option value="KZT">KZT</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* ФИО сотрудника */}
        <div className="input-group">
          <label htmlFor="name_person">ФИО сотрудника:</label>
          <input
            type="text"
            id="name_person"
            placeholder="Введите ФИО сотрудника"
            {...register("name_person")}
          />
        </div>

        {/* Должность сотрудника */}
        <div className="input-group">
          <label htmlFor="position">Должность сотрудника:</label>
          <input
            type="text"
            id="position"
            placeholder="Введите должность сотрудника"
            {...register("position")}
          />
        </div>

        {/* Телефон сотрудника */}
        <div className="input-group">
          <label htmlFor="phone_person">Телефон сотрудника:</label>
          <input
            type="text"
            id="phone_person"
            placeholder="Введите телефон сотрудника"
            {...register("phone_person")}
          />
        </div>

        {/* ФИО бухгалтера */}
        <div className="input-group">
          <label htmlFor="name_bookkeeper">ФИО бухгалтера:</label>
          <input
            type="text"
            id="name_bookkeeper"
            placeholder="Введите ФИО бухгалтера"
            {...register("name_bookkeeper")}
          />
        </div>

        {/* Телефон бухгалтера */}
        <div className="input-group">
          <label htmlFor="phone_bookkeeper">Телефон бухгалтера:</label>
          <input
            type="text"
            id="phone_bookkeeper"
            placeholder="Введите телефон бухгалтера"
            {...register("phone_bookkeeper")}
          />
        </div>
      </div>

      {/* Отображение ошибки, если есть */}
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles["register-button"]} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

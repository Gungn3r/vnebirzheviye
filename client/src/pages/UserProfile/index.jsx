// UserProfile.jsx
import React from 'react';
import './UserProfile.module.scss';

export const UserProfile = () => {
    return (
      <div className="profile-container">
        <h2>Профиль пользователя</h2>
  
        {/* Дата регистрации */}
        <div className="input-group">
          <label htmlFor="registrationDate">Дата регистрации:</label>
          <input type="text" id="registrationDate" value={new Date().toLocaleDateString()} readOnly />
        </div>
  
        {/* Резидент */}
        <div className="input-group">
          <label htmlFor="resident">Резидент:</label>
          <input type="checkbox" id="resident" checked readOnly />
        </div>
  
        {/* Наименование компании */}
        <div className="input-group">
          <label htmlFor="companyName">Наименование компании:</label>
          <input type="text" id="companyName" value="Название компании" readOnly />
        </div>
  
        {/* БИН */}
        <div className="input-group">
          <label htmlFor="bin">БИН:</label>
          <input type="text" id="bin" value="123456789" readOnly />
        </div>
  
        {/* Юридический адрес */}
        <div className="input-group">
          <label htmlFor="legalAddress">Юридический адрес:</label>
          <input type="text" id="legalAddress" value="Юридический адрес" readOnly />
        </div>
  
        {/* Фактический адрес */}
        <div className="input-group">
          <label htmlFor="actualAddress">Фактический адрес:</label>
          <input type="text" id="actualAddress" value="Фактический адрес" readOnly />
        </div>
  
        {/* Почта */}
        <div className="input-group">
          <label htmlFor="email">Почта:</label>
          <input type="text" id="email" value="example@example.com" readOnly />
        </div>
  
        {/* Пароль (можно использовать input type="password" для скрытия пароля) */}
        <div className="input-group">
          <label htmlFor="password">Пароль:</label>
          <input type="text" id="password" value="********" readOnly />
        </div>
  
        {/* Кнопка "Редактировать профиль" */}
        <button className="edit-profile-button">Редактировать профиль</button>
      </div>
    );
  };

  export default UserProfile;
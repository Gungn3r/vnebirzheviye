import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = ({ isAuthenticated }) => {
  return (
    <header className={styles['header']}>
      <div className={styles['logo']}>
        <Link to="/">
          <img src="/path/to/logo.png" alt="GoBroker" />
        </Link>
      </div>
      <div className={styles['account']}>
        {isAuthenticated ? (
          <Link to="/profile">Профиль</Link>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </header>
  );
};

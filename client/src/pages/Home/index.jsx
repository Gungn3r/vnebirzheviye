import React from 'react';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles['home-content']}>
      <h1>Добро пожаловать на главную страницу!</h1>
      <p>Это ваш персональный кабинет. Здесь вы можете...</p>

    </div>
  );
};


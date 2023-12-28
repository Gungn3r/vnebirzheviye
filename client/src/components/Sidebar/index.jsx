import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <Link to="/otc-deals" className={styles.sidebarItem}>
        Внебиржевые сделки
      </Link>
      <Link to="/profile" className={styles.sidebarItem}>
        Профиль
      </Link>
    </nav>
  );
};
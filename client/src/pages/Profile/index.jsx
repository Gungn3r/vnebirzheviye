// Profile.jsx
import React, { useState } from 'react';
import OngoingBids from '../OngoingBids';
import './Profile.module.scss';
import UserProfile from '../UserProfile'

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      <h2>Профиль пользователя</h2>

      <div className="tabs">
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')}>
          Профиль
        </button>
        <button className={activeTab === 'ongoingBids' ? 'active' : ''} onClick={() => handleTabChange('ongoingBids')}>
          Состоявшиеся заявки
        </button>
      </div>

      {activeTab === 'profile' && <UserProfile />}
      {activeTab === 'ongoingBids' && <OngoingBids />}
    </div>
  );
};

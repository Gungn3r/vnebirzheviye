// OngoingBids.jsx
import React from 'react';

export const OngoingBids = () => {

  const ongoingBidsData = [
    { id: 1, productName: 'Продукт 1', status: 'В процессе' },
    { id: 2, productName: 'Продукт 2', status: 'В ожидании' },
  ];

  return (
    <div>
      <h3>Состоявшиеся заявки</h3>
      <ul>
        {ongoingBidsData.map((bid) => (
          <li key={bid.id}>
            <strong>ID заявки:</strong> {bid.id}<br />
            <strong>Наименование товара:</strong> {bid.productName}<br />
            <strong>Статус:</strong> {bid.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OngoingBids;

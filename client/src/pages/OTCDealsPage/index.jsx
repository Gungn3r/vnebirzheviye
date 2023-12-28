import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OTCBidDetails from "../../components/OTCBidDetails";
//import OTCBid from "../../pages/OTCBid";
import { ApplicationService } from "../../services";

export const OTCDealsPage = () => {
  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);

  const handleBidSelect = (bidData) => {
    setSelectedBid(bidData);
  };

  const handleBidRespond = (responseMessage) => {
    console.log(`Отправлен отклик: ${responseMessage}`);
  };

  async function getAllBids() {
    try {
      const response = await ApplicationService.getAll();
      setBids(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllBids();
  }, []);

  return (
    <div>
      <h2>Внебиржевые сделки</h2>

      {/* Вывод существующих заявок */}

      {bids.map((bid) => (
        <p
          style={{ cursor: "pointer", padding: "10px", color: "blue" }}
          onClick={() => handleBidSelect(bid)}
        >
          {JSON.stringify(bid)}
        </p>
      ))}

      {/* Показать детали выбранной заявки, если она выбрана */}
      {selectedBid && (
        <OTCBidDetails bidData={selectedBid} onRespond={handleBidRespond} />
      )}

      <Link to="/otc-bid">
        <button>Создать новую заявку</button>
      </Link>
    </div>
  );
};

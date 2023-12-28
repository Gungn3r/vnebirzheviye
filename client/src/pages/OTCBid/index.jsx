import React, { useState } from "react";
import styles from "./OTCBid.module.scss";
import { ApplicationService } from "../../services";

export const OTCBid = () => {
  const [action, setAction] = useState("Купить");
  const [productName, setProductName] = useState("");
  const [volume, setVolume] = useState("");
  const [priceWithVAT, setPriceWithVAT] = useState("0.00");
  const [deliveryBasis, setDeliveryBasis] = useState("");
  const [deliveryPlace, setDeliveryPlace] = useState("");
  const [counterpartyOption, setCounterpartyOption] = useState("single");
  const [binIin, setBinIin] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const calculateTotalAmount = () => {
    const volumeValue = parseFloat(volume);
    const priceWithVATValue = parseFloat(priceWithVAT);

    if (!isNaN(volumeValue) && !isNaN(priceWithVATValue)) {
      return (volumeValue * priceWithVATValue).toFixed(2);
    } else {
      return "0.00";
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    const data = {
      type: action,
      name_product: productName,
      volume,
      price_for_1: Number(priceWithVAT),
      total_price: Number(deliveryBasis),
      place_of_delivery: deliveryPlace,
      choice_counteragent: counterpartyOption,
      bin: Number(deliveryBasis),
      additional_information: additionalInfo,
    };

    try {
      const response = await ApplicationService.create(data);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles["container"]}>
      <div className={styles["action-buttons"]}>
        <label>
          <input
            type="radio"
            value="Купить"
            checked={action === "Купить"}
            onChange={() => setAction("Купить")}
          />
          Купить
        </label>
        <label>
          <input
            type="radio"
            value="Продать"
            checked={action === "Продать"}
            onChange={() => setAction("Продать")}
          />
          Продать
        </label>
      </div>

      <div className={styles["text-inputs"]}>
        <label>
          Введите наименование товара:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
      </div>

      <div className={styles["text-inputs"]}>
        <label>
          Введите объём товара в тоннах:
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </label>
      </div>

      <div className={styles["amount-fields"]}>
        <label>
          Введите стоимость за 1 тонну с НДС:
          <input
            type="number"
            value={priceWithVAT}
            onChange={(e) => setPriceWithVAT(e.target.value)}
          />
        </label>

        <label>
          Итоговая сумма:
          <input type="text" value={calculateTotalAmount()} readOnly />
        </label>
      </div>

      <div className={styles["delivery-fields"]}>
        <label>
          Базис поставки:
          <select
            value={deliveryBasis}
            onChange={(e) => setDeliveryBasis(e.target.value)}
          >
          </select>
        </label>

        <label>
          Укажите место поставки:
          <input
            type="text"
            value={deliveryPlace}
            onChange={(e) => setDeliveryPlace(e.target.value)}
          />
        </label>
      </div>

      <div className={styles["option-buttons"]}>
        <label>
          <input
            type="radio"
            value="Один контрагент"
            checked={counterpartyOption === "Один контрагент"}
            onChange={() => setCounterpartyOption("Один контрагент")}
          />
          Один контрагент
        </label>
        <label>
          <input
            type="radio"
            value="Несколько контрагентов"
            checked={counterpartyOption === "Несколько контрагентов"}
            onChange={() => setCounterpartyOption("Несколько контрагентов")}
          />
          Несколько контрагентов
        </label>
      </div>

      {counterpartyOption === "single" && (
        <div className={styles["text-inputs"]}>
          <label>
            Введи БИН/ИИН:
            <input
              type="text"
              value={binIin}
              onChange={(e) => setBinIin(e.target.value)}
            />
          </label>
        </div>
      )}

      <div className={styles["additional-info"]}>
        <label>
          Укажите дополнительные сведения:
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className={styles["button"]}>
        Создать заявку
      </button>
    </form>
  );
};

export default OTCBid;

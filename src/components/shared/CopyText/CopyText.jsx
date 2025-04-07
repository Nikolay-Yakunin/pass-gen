import React from "react";
import styles from "./CopyText.module.css";

export const CopyText = ({ children }) => {
  const handleCopy = () => {
    // Буффер
    navigator.clipboard
      .writeText(children)
      // Чисто для того, чтобы показать как работает обработка ошибок
      .then(() => {
        console.log("Текст скопирован в буфер обмена");
      })
      .catch((err) => {
        console.error("Ошибка при копировании:", err);
      });
  };

  return (
    <div className={styles.copyText} onClick={handleCopy}>
      {children}
    </div>
  );
};

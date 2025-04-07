import React from "react";
import styles from "./CopyText.module.css";

/**
 * @brief Элемент принимает текст или разметку, позволяя сахранять содержимое в буффер
 * @param {*} param0
 * @returns jsx
 */
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
      {/* Да, условно, все входящие параметры это props, а разметка вставляемая
        Вот так, например <CopyText> <h1>Это разметка</h1> </CopyText>
        Это Children - https://ur-react-dev.vercel.app/reference/react/Children
        */}
    </div>
  );
};

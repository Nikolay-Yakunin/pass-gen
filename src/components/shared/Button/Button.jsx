import React from "react";
import styles from './Button.module.css';

/**
 * @brief Компонент кнопки, принимает текст или разметку
 * @param {*} props 
 * @returns jsx
 */
export const Button = ({children}) => {
    return (
        <button className={`${styles.button}`}>{children}</button>
    )
}


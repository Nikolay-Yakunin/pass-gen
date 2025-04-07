import React from "react";
import styles from './button.module.css';

/**
 * @brief Компонент кнопки, принимает текст или разметку
 * @param {*} props 
 * @returns jsx
 */
const Button = (props) => {
    return (
        <button className={`${styles.button}`}>{props}</button>
    )
}
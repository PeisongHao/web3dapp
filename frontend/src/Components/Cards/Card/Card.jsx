import React from "react";
import styles from './Card.module.css';
function Card({title,text1, text2}){
    return(
        <div className={styles.cardContainer}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text_dis}>{text1}</p>
            <p className={styles.text_dis2}>{text2}</p>
        </div>
    );
}

export default Card;
import React from "react";
import styles from './Footer.module.css';

function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_item}>
                <p className={styles.mytext}>AGE Coin</p>
                <p className={styles.mytext}>AGE Coin: ArtFi Revolution on Twitter/X</p>
                <div className={styles.mytext2}>
                    <p>Contract: 0x0cc8D1C358C007cac55Fa0Bb3c750E723538f659</p>
                </div>
            </div>
            <div className={styles.footer_item}>
                <p className={styles.mytext}>Media</p>

                <a className={styles.mytext3} href="https://twitter.com/artGee15" target="_blank" rel="noopener noreferrer">Twitter(X)</a>
                <a className={styles.mytext3} href="https://t.me/agecoinofficial" target="_blank" rel="noopener noreferrer">Telegram</a>
 
                <a className={styles.mytext3} href="https://artgee6.medium.com/" target="_blank" rel="noopener noreferrer">Medium </a>
                <a className={styles.mytext3} href="https://www.instagram.com/artgee.io/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div className={styles.footer_item}>
                <p className={styles.mytext}>Email</p>
                <p className={styles.mytext}>hi@artgee.io</p>
            </div>  
        </footer>
    )
}

export default Footer;
import React from "react";
import styles from './Header.module.css';

const handleButtonClick = () => {
    window.open('https://app.uniswap.org/tokens/ethereum/0x9cbd1d5aa4e20362490d581271a3d439a058749a', '_blank');
};

function Title(){
    return(
        <header className={styles.header1}>
            <div className={styles.centerTitle}>
                    <h1 className={styles.titleToTop}>NEW CRYPTO ART $AGE</h1>
                    <div className={styles.pTotile}>AGE Coin: ArtFi Revolution on Twitter/X</div>
                    <div className={styles.button_container}>
                        {/* <button className={styles.while_square_button}>RANK</button> */}
                        <button className={styles.while_square_button} onClick={handleButtonClick}>TRADE</button>
                    </div>
            </div>
        </header>
    );
}

export default Title;
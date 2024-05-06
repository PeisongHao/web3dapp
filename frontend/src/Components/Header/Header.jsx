import React from "react";
import styles from './Header.module.css';
import logo from '../../Picture/A.png';
import { Link } from 'react-router-dom';

import { signout } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

function Header({handleOpenModal,isShowClaim}){
    const dispatch = useDispatch();
    const handleLogOut = () =>{
        dispatch(signout());
        window.location.href = '/';
    }
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoBox}>
                    <div className={styles.headerContainer}>
                        <img src={logo} alt="Logo" className={styles.logo}/>
                        <div className={styles.logoWord}>AGE Coin</div>
                        {isShowClaim ?  <Link to="/claim" className={styles.custom_link}>  <div className={styles.logoWord3}> Points</div> </Link>  : null}
                    </div>
                </div>

                <div className={styles.logoBox2}>
                    <div className={styles.headerContainer}>
                        <Link to="/" className={styles.custom_link}>
                            <div className={styles.logoWord2}>Home</div>
                        </Link>
                        <a className={styles.logoWord2} href="https://artgee6.medium.com/age-coin-defining-a-new-age-in-crypto-art-9e4dcec68001" target="_blank" rel="noopener noreferrer">About</a>
                        {isShowClaim ? <button className={styles.purple_square_button} onClick={handleLogOut}>LOGOUT</button>:
                        <button onClick={handleOpenModal} className={styles.purple_square_button}>LOGIN</button>}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
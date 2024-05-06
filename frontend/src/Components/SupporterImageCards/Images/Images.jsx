import React from "react";
import styles from './Images.module.css';
function Images({pic1,pic2,pic3}){
    const baseUrl = "/Pictures";
    let secondpic = <img src ={`${baseUrl}/${pic2}.png`} alt={pic2} className={styles.logo}/>;
    if(pic2 === "5IMO"){
        secondpic =secondpic = <img src ={`${baseUrl}/${pic2}.png`} alt={pic2} className={styles.logoIMO}/>;
    }
    if(pic2 === "2CG") {
        secondpic =secondpic = <img src ={`${baseUrl}/${pic2}.png`} alt={pic2} className={styles.logoCG}/>;
    }

    let thirdpic = <img src ={`${baseUrl}/${pic3}.png`} alt={pic3} className={styles.logo2}/>;

    if(pic3 === "6jiemianxinwen"){
        thirdpic = <img src ={`${baseUrl}/${pic3}.png`} alt={pic3} className={styles.logoJM}/>;
    }
    if(pic3 === "3zhebencong"){
        thirdpic = <img src ={`${baseUrl}/${pic3}.png`} alt={pic3} className={styles.logoZBC}/>;
    }
    if(pic3 === "3zhenbencong1"){
        thirdpic = <img src ={`${baseUrl}/${pic3}.png`} alt={pic3} className={styles.logoZBC1}/>;
    }
    return(
        <div className={styles.imageContainer}>
            <div className={styles.imageFrame}>
                {pic1 === "1DRF"?
                <img src ={`${baseUrl}/${pic1}.png`} alt={pic1} className={styles.logospc}/>:
                <img src ={`${baseUrl}/${pic1}.png`} alt={pic1} className={styles.logo}/>
                }
            </div>
            <div className={styles.imageFrame}>
                {secondpic}
            </div>
            <div className={styles.imageFrame}>
                {thirdpic}
            </div>
        </div>
    )
}

export default Images;
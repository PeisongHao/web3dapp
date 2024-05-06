import React from "react";
import styles from './SupporterImageCards.module.css';
import Images from "./Images/Images";
function SupporterImageCard(){
    return (
        <div className={styles.CardContainer}>
            <div className={styles.title}>Investors</div>
            <Images pic1={"1DRF"} pic2={"2vega"} pic3={"3zhenbencong1"}/>
            <Images pic1={"4conflux"} pic2={"5IMO"} pic3={"6iosg"}/>
            <div className={styles.title}>Art Partners</div>
            <Images pic1={"1SuperRare"} pic2={"2NG"} pic3={"3FND"}/>
            <div className={styles.title}>Press Features</div>
            <Images pic1={"1BI"} pic2={"2CG"} pic3={"3aap"}/>
            {/* <Images pic1={"4shijicaijing"} pic2={"5tengxunxinwen"} pic3={"6jiemianxinwen"}/>
            <Images pic1={"7PA"} pic2={"8lianbushou"} pic3={"9qukuailvdong"}/> */}
        </div>
    );
}

export default SupporterImageCard;
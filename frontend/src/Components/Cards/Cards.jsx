import React from "react";
import Card from "./Card/Card";
import styles from './Cards.module.css';
function Cards(){
    return (
        <div>
            <div className={styles.cards_container}>
                <Card title ="🖼 Art Sharing Rewards" text1="• The more you interact, 
                the more points you earn. This includes sharing art, liking, and commenting." text2="• Points accumulate automatically based on the quality
                and quantity of interactions."/>
                <Card title ="🎖️ Points Leaderboard" text1="• Steadily accumulate points through interactions with tweets tagged #age."
                text2="• Our system updates your total points in real-time."/>
            </div>
            <div className={styles.cards_container2}>
                <Card title ="🔍 AGE Points Calculator" text1="• Predict your points earnings by inputting interaction data."
                 text2="• Get points suggestions for different types of interactions."/>
                <Card title ="💎 Token Exchange" text1="• After the activity cycle ends, you will automatically receive $AGE token airdrops as rewards based on your points."
                text2="• Token conversion rates are adjusted periodically based on market value."/>
            </div>
        </div>
    );
}

export default Cards
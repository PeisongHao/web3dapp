import React from 'react';
import styles from './CalculaterSelector.module.css'; // 引入样式文件
import Calculator from '../Calculater/Calculater';
function CalculaterSelector({isPublisher,setIsPublisher}) {

    return (
        <div>
            <div className={styles.tabs}>
                <div 
                    className={styles.tab} 
                    onClick={() => setIsPublisher(true)}
                >
                    <h2 className={styles.h2_color}>Publisher Calculator</h2>
                    {isPublisher && <div className={styles.underline}></div>}
                </div>
                <div 
                    className={styles.tab} 
                    onClick={() => setIsPublisher(false)}
                >
                    <h2 className={styles.h2_color}>Interactor Calculator</h2>
                    {isPublisher === false && <div className={styles.underline}></div>}
                </div>
            </div>
            <div className={styles.container}>
            {isPublisher?<div className={styles.textContainer}>
               <p>As an art publisher, your role is to share and display crypto art. Publish your artworks on social media with the #age tag to earn points. For detailed information on how points are accumulated, please refer to the calculator on the right. Your published art tweets must explicitly contain the #age tag to enable interactors to find and engage with them.</p>
            </div>:
            <div className={styles.textContainer}>
                <p>The task of an art interactor is to engage with the works of art publishers on social media platforms. You can earn points by liking, commenting, or retweeting artworks that include the #age tag. For detailed information on how points are earned, please refer to the calculator on the right. Your interactions will directly support the artists and allow you to accumulate points.</p>
            </div>}
            {isPublisher?<Calculator cal_title ={"Publisher Calculator"} viewspoint ={1} likespoint = {100} repliespoint = {200} retweetspoint ={500} isPublisher={isPublisher}/>
                :<Calculator cal_title ={"Interactor Calculator"} viewspoint ={0} likespoint = {50} repliespoint = {100} retweetspoint ={200} isPublisher={isPublisher}/>}
            </div>
        </div>
    );
}

export default CalculaterSelector;
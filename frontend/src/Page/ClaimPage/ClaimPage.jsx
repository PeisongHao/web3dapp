import React, {useState } from 'react';
import styles from  './ClaimPage.module.css';
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import CalculaterSelector from "../../Components/CalculaterSelector/CalculaterSelector";
import Footer from "../../Components/Footer/Footer";
import config from "../../config/config";
import intro from "../../Picture/intro.png";
const ClaimPage = ()=>{

    const myState = useSelector((state) => state.auth);
    const [Credit,setCredit] = useState("--");
    const [isPublisher,setIsPublisher] = useState(true);
    const [, setError] = useState(null);
    const [showConnect,setShowConnect] = useState(false); 
    const [lastUpdate, setlastUpdate] = useState(null);
    const [showUpdatetime, setshowUpdatetime] = useState(false);
    const handleOpenModal = () => {
    };
    const handleClick = ()=>{
        const token = myState.encryptedToken;
        const tokenSecret = myState.encryptedTokenSecret;
        const username = myState.user;
        const userid = myState.userid;
        fetch(`${config.BACKEND_ENDPOINT}/getUserData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, tokenSecret,username,userid }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setShowConnect(data.showConnect);
            setCredit(data.credits);

            const date = new Date(data.lastUpdate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // getMonth() 返回的月份从 0 开始
            const day = date.getDate();
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            setlastUpdate(formattedDate);

            if(data.showConnect === false){
                setshowUpdatetime(true);
            }
        })
        .catch(error => {
            setError(error.message);
        });
    }

    const handleConnect = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                return accounts[0];
            } catch (error) {
                console.error("Error during account request:", error);
            }
        } else {
            console.log("MetaMask is not installed.");
        }
    };
    const connectWallet = async () => {
        const userid = myState.userid;
        const account = await handleConnect();
        if (account) {
            console.log("Connected account:", account);
            const data = { userid, address: account };

            fetch(`${config.BACKEND_ENDPOINT}/updateUserData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                setshowUpdatetime(true);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
                // 在这里处理错误
            });
        }
    };

    return (
        <div className={styles.centered_text2}>
            <Header handleOpenModal={handleOpenModal} isShowClaim ={myState.isLoggedIn}/>
            <img src={intro} alt="Intro" className={styles.introImage}/>
            <div className={styles.centered_text}>
               <h1 className ={styles.custom_heading}> Check Your Balance</h1>
               <p className={styles.custom_credit}>{Credit}</p>
               <p className={styles.custom_credit2}>points</p>
               <div className={styles.line} />
               {showUpdatetime?
                <div>
                    <p>Last updated on {lastUpdate}.</p>
                    <p>Check back tomorrow for updates.</p>
                </div>
                :(showConnect? <div> 
                    <button className={styles.square_button} onClick={connectWallet}> Connect</button>
                    <p>Connect wallet, receive airdrop</p>
               </div>
               :<div>
                    <button className={styles.square_button} onClick={handleClick}> Verify</button>
                    <p>Click to view the latest points status</p>
                </div>)
               }
               {/* <p className ={styles.custom_heading}> 「Crypto Art AGE Digg Season」</p>
               <p className ={styles.custom_text}>The first airdrop event will begin on January 1, 2024,</p>
               <p className ={styles.custom_text}>and will continue until January 31, 2024.</p>
               <p className ={styles.custom_text}>During this period, you can log in to the AGECOIN website and </p>
               <p className ={styles.custom_text}>earn points by posting or interacting with tweets featuring </p>
               <p className ={styles.custom_text}>$AGE-tagged artworks on Twitter.</p>
               <p className ={styles.custom_text}>At the beginning of the month following the end of the event, we</p>
               <p className ={styles.custom_text}>will automatically calculate the amount of Tokens each user is</p>
               <p className ={styles.custom_text}>entitled to and distribute them uniformly. </p>
               <p className ={styles.custom_text}>Explore point calculations with the below calculator. </p> */}
                <h1 className={styles.my_title}>$AGE Calculater</h1>
                <div className={styles.parentContainer}>
                    <CalculaterSelector isPublisher={isPublisher} setIsPublisher={setIsPublisher}/>
                </div>
            </div>
            <Footer />
         </div>
    );
}
 
export default ClaimPage;
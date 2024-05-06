import React,{ useState} from "react";
import { Helmet } from 'react-helmet';

import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/actions/authAction";

import Header from "../../Components/Header/Header";
import styles from './ConsolePage.module.css';
import Cards from "../../Components/Cards/Cards";
import Title from "../../Components/Header/Title";
import Modal from "../../Components/Modal/Modal";
import Footer from "../../Components/Footer/Footer";
import CalculaterSelector from "../../Components/CalculaterSelector/CalculaterSelector";
import SupporterImageCard from "../../Components/SupporterImageCards/SupporterImageCars";
const ConsolePage = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublisher,setIsPublisher] = useState(true);
    let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        dispatch(signin());
        setIsModalOpen(false);
    }
    // console.log(useSelector((state) => state));
    return (
        <div className={styles.centered_text}>
            <Helmet>
                <meta
                name="description"
                content="ArtFi Revolution on Twitter/X"
                />
            </Helmet>
           <Header handleOpenModal={handleOpenModal} isShowClaim ={isLoggedIn}/>
           <Title />
           <div className={styles.color_gradient_bar}>
                <h1 className={styles.my_title}>What is ArtGee Network?</h1>
                <div className={styles.text_dis}>
                    <p>ArtGee Network is a decentralized network tailored for crypto art, aiming to boost the visibility and liquidity of the entire crypto art ecosystem</p>
                    <p>by fostering the development of the crypto art economy.</p>
                </div>
                <div className={styles.text_dis}>
                    <p>To date, there has not been a fair and solid consensus-based decentralized token economy in the global crypto art market. As the first Web3</p>
                    <p>Art-Fi social information aggregator within the Ethereum ecosystem, ArtGee Network pioneers the 'curate to earn' model, where users can</p>
                    <p>earn points and exchange them for tokens as rewards for curating and promoting quality crypto art events and content.</p>
                </div>
           </div>
           <div className={styles.color_gradient_bar2}>
                <h1 className={styles.my_title}>How $AGE Works?</h1>
                <Cards />
           </div>
           <div className={styles.color_gradient_bar3}>
                <h1 className={styles.my_title}>$AGE Calculater</h1>
                <div className={styles.parentContainer}>
                    <CalculaterSelector isPublisher={isPublisher} setIsPublisher={setIsPublisher}/>
                </div>
                <div className={styles.parentContainer}>
                    <p className={styles.textContainer6}>
                    {/* In the realm of digital art, sharing and curating art is an integral part of its culture.
                    This is an ecosystem supported by passionate and dedicated artists and collectors, who together strive to invigorate and vitalize the field.
                     Furthermore, we wholeheartedly welcome onlookers to join in the new era of digital art collecting,
                     to collectively propel the development of the global crypto art collecting market. */}
                    </p>
                </div>
                {/* <div className={styles.parentContainer}>
                    <p className={styles.textContainer5}>
                    Established strategic partnerships with top global crypto art trading platforms.
                    </p>
                </div> */}
                <div className={styles.parentContainer}>
                    <SupporterImageCard />
                </div>
           </div>
           <Footer />
           <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
        </div>
    )
}

export default ConsolePage;
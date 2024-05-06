import React from 'react';
import styles from './Modal.module.css'; // 引入样式
function Modal({isOpen, onClose }) {
    //这里需要一个数据用户handle twitter传回的数据信息
    //我们需要将这个信息设置到redux里面
    //需要修改 onClick={onClose}
    //这里都需要储存什么元素需要思考
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.text}>
                    <p className={styles.blueTextLarge}>Welcome to $AGE</p>
                    <p className={styles.blueTextLarge}>Easily join $AGE using your Twitter account. This is just for verification, and we won't post or make any changes.</p>
                    <button onClick={onClose} className={styles.pinkButton}>CONNECT ACCOUNT</button>
                    <p className={styles.blueTextSmall}>By connecting, you agree to our Terms of Service and Privacy Policy. $AGE will access your Twitter info to enhance your social experience, but you can revoke access anytime. 
                </p>
                </div>
            </div>
        </div>
    );
}

export default Modal;
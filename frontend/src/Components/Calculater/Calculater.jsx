import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import styles from "./Calculater.module.css";
const Calculator = ({cal_title,viewspoint,likespoint,repliespoint,retweetspoint,isPublisher}) => {
  // 初始状态
//   const [views, setViews] = useState(0);
  const [views, ] = useState(0);
  const [likes, setLikes] = useState(0);
  const [replies, setReplies] = useState(0);
  const [retweets, setRetweets] = useState(0);

  // 计算分数
  const calculateTotalPoints = () => {
    return views * viewspoint + likes * likespoint + replies * repliespoint + retweets * retweetspoint;
  };

    return (
        <div className={styles.publisher_calculator}>
          <p className={styles.title}>{cal_title}</p>

           {/* Views */}
           {/* {isPublisher?<div className={styles.metric}>
                <label className={styles.metric_label}>
                    Views
                    <p className={styles.small_text}>1 view = {viewspoint} point</p>
                </label>
                <div className={styles.slider_container}>
                    <ReactSlider
                            className={styles.slider}
                            thumbClassName={styles.thumb}
                            trackClassName={styles.track}
                            value={views}
                            max={5000}
                            onChange={newValue => setViews(newValue)}
                            
                    />
                    <div className={styles.slider_info}>
                        <p>{views} Views</p>
                        <p>{views} Points</p>
                    </div>
                </div>
            </div>:null} */}

            {/* Likes */}
            <div className={styles.metric}>
                <label className={styles.metric_label}>
                    Likes
                    <p className={styles.small_text}>1 like = {likespoint} points</p>
                </label>
                <div className={styles.slider_container}>
                    <ReactSlider
                            className={styles.slider}
                            thumbClassName={styles.thumb}
                            trackClassName={styles.track}
                            value={likes}
                            max={5000}
                            onChange={newValue => setLikes(newValue)}
                    />
                    <div className={styles.slider_info}>
                        <p>{likes} Likes</p>
                        <p>{likes * likespoint} Points</p>
                    </div>
                </div>
            </div>

            {/* Replies */}
            <div className={styles.metric}>
                <label className={styles.metric_label}>
                    Replies
                    <p className={styles.small_text}>1 reply = {repliespoint} points</p>
                </label>
                <div className={styles.slider_container}>
                    <ReactSlider
                            className={styles.slider}
                            thumbClassName={styles.thumb}
                            trackClassName={styles.track}
                            value={replies}
                            max={5000}
                            onChange={newValue => setReplies(newValue)}
                    />
                    <div className={styles.slider_info}>
                        <p>{replies} Replies</p>
                        <p>{replies * repliespoint} Points</p>
                    </div>
                </div>
            </div>

            {/* Retweets */}
            <div className={styles.metric}>
                <label className={styles.metric_label}>
                    Retweets
                    <p className={styles.small_text}>1 retweet = {retweetspoint} points</p>
                </label>
                <div className={styles.slider_container}>
                    <ReactSlider
                            className={styles.slider}
                            thumbClassName={styles.thumb}
                            trackClassName={styles.track}
                            value={retweets}
                            max={5000}
                            onChange={newValue => setRetweets(newValue)}
                    />
                    <div className={styles.slider_info}>
                        <p>{retweets} Retweets</p>
                        <p>{retweets * retweetspoint} Points</p>
                    </div>
                </div>
            </div>
          <div className={styles.total_points}>
            Total Points: {calculateTotalPoints()}
          </div>
        </div>
      );
};

export default Calculator;
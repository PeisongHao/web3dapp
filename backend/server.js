const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const { TwitterApi } = require('twitter-api-v2');
const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL}));

app.use(express.static('public')); //index page

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
    }
}));

// 初始化 Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/twitter/callback`
    },
    // function(token, tokenSecret, profile, cb) {
    //     // 在这里处理用户信息
    //     return cb(null, profile);
    // }
    function(token, tokenSecret, profile, done) {
        const user = {
          ...profile,
          token,         // 保存 access_token_key
          tokenSecret    // 保存 access_token_secret
        };
        return done(null, user);
    }
));

// 序列化用户到 session
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

// 从 session 反序列化用户
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/auth/twitter', passport.authenticate('twitter'));


const crypto = require('crypto');

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', 'YOUR_ENCRYPTION_KEY'); // 使用自己的密钥
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
    const decipher = crypto.createDecipher('aes-256-cbc', 'YOUR_ENCRYPTION_KEY'); // 使用相同的密钥
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const frontendUrl = process.env.FRONTEND_URL;

app.get('/twitter/callback', (req, res, next) => {
    passport.authenticate('twitter', (err, user, info) => {
        if (err) {
            // 处理错误
            return res.redirect(`${frontendUrl}/twitterfail?error=${encodeURIComponent(err.message)}`);
        }
        if (!user) {
            // 处理认证失败
            return res.redirect(`${frontendUrl}/twitterfail?error=${encodeURIComponent(info.message)}`);
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            // 成功认证，重定向到首页。
            const encryptedToken = encrypt(user.token);
            const encryptedTokenSecret = encrypt(user.tokenSecret);
            const username = user.username || user.displayName;
            const twitterId = user.id;
            // console.log(`Redirecting with Twitter ID: ${twitterId}`);
            return res.redirect(`${frontendUrl}/twittersuccess?token=${encodeURIComponent(encryptedToken)}&tokenSecret=${encodeURIComponent(encryptedTokenSecret)}&username=${encodeURIComponent(username)}&twitterId=${encodeURIComponent(twitterId)}`);
        });
    })(req, res, next);
});


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // 解析JSON请求体

async function fetchTweets(token, tokenSecret, username,userId) {
    try {
        token = decrypt(token);
        tokenSecret = decrypt(tokenSecret);
        
        const twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: token, 
            accessSecret: tokenSecret,
        });
        
        const user = await twitterClient.v2.userByUsername(username);
        const userId = user.data.id;
        
        const currentDateTime = new Date();
        currentDateTime.setMinutes(currentDateTime.getMinutes() - 1);
        const oneMinuteBefore = currentDateTime.toISOString();

        const starttime = new Date('2024-02-13T00:00:00Z').toISOString();
        const data = await twitterClient.v2.get('tweets/search/recent', {
            query: `#age from:${username} -is:retweet -is:reply`,
            start_time: starttime,
            end_time: oneMinuteBefore,
            'tweet.fields': 'public_metrics' // 请求公共度量数据
        });  
        
        //计算已经发送推文的喜欢，回复和转发数量（不包含retweet和reply）
        let tweetScore = 0;
        if (data && Array.isArray(data.data)) {
            tweetScore = data.data.reduce((acc, tweet) => {
                const likeScore = tweet.public_metrics.like_count * 100;
                const replyScore = tweet.public_metrics.reply_count * 200;
                const retweetScore = tweet.public_metrics.retweet_count * 500;
                        
                return acc + likeScore + replyScore + retweetScore;
            }, 0);
        }
                        
        //计算retweet数量
        const tweets = await twitterClient.v2.get('tweets/search/recent', {
            query: `#age from:${username} is:retweet`,
            start_time: starttime,
            end_time: oneMinuteBefore,
            'tweet.fields': 'public_metrics' // 请求公共度量数据
        });  
        let retweetScore = 0
        if(tweets && tweets.data && Array.isArray(tweets.data)){
            const retweetsWithHashtag = tweets.data.filter(tweet =>
                tweet.text.startsWith("RT @") && tweet.text.includes("#age")
            );
            retweetScore = retweetsWithHashtag.length * 200;
        }

        const startTime = new Date(starttime).getTime();
        const endTime = new Date(oneMinuteBefore).getTime();
        
        // //计算点赞别人推文的数量
        let likedTweets;
        try {
            const queryParams = {
                "tweet.fields": "created_at" // 指定额外需要的字段
            };
            likedTweets = await twitterClient.v2.get(`users/${userId}/liked_tweets`,queryParams);
        } catch (error) {
            console.error('Error fetching liked tweets:', error);
            throw error;
        }
        let likesOther = 0
        if(likedTweets && likedTweets.data && Array.isArray(likedTweets.data)){
            
            const taggedTweets = likedTweets.data.filter(tweet => {
                const tweetTime = new Date(tweet.created_at).getTime();
                return tweet.text.includes("#age") && tweetTime >= startTime && tweetTime <= endTime;
            });
            
            likesOther = taggedTweets.length * 50;
        }

        // //计算回复他人推文的数量
        const startTime_r = new Date(starttime).toISOString();
        const endTime_r = new Date(oneMinuteBefore).toISOString();
        const query = `from:${userId} -is:retweet -is:quote`;

        const userTweets = await twitterClient.v2.search(query, {
            "tweet.fields": ["created_at", "conversation_id", "referenced_tweets"],
            "start_time": startTime_r,
            "end_time": endTime_r,
            max_results: 100
        });

        let replyOther = 0;
        if (userTweets && Array.isArray(userTweets.data.data)) {
            for (const tweet of userTweets.data.data) {
                // 检查推文是否是回复
                if (tweet.referenced_tweets && tweet.referenced_tweets[0].type === 'replied_to') {
                    // 获取原始推文的 ID
                    const originalTweetId = tweet.referenced_tweets[0].id;
        
                    // 获取原始推文的详情
                    const originalTweet = await twitterClient.v2.singleTweet(originalTweetId, {
                        "tweet.fields": ["created_at", "text"]
                    });
        
                    // 检查原始推文是否包含 #age 标签
                    if (originalTweet.data.text.includes('#age')) {
                        // console.log(tweet);
                        replyOther += 100;
                    }
                }
            }
        }
        
        return { tweetScore, retweetScore, likesOther, replyOther };
    } catch (err) {
        console.error(err);
        throw err; // 抛出错误以便调用者处理
    }
}

app.post('/fetch-tweets', async (req, res) => {
    try {
        const { token, tokenSecret, username } = req.body;
        const scores = await fetchTweets(token, tokenSecret, username);
        return res.json(scores);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

//for dynamodb
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2', // 设置您的区域
    accessKeyId: process.env.AWS_DB_ACCESS_ID,
    secretAccessKey: process.env.AWS_DB_ACCESS_KEY
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

app.post('/getUserData',async (req, res) => {
    const { token, tokenSecret, username, userid} = req.body;
    // console.log('Type of twitterId:', typeof userid);
    const queryParams = {
        TableName: 'UserTable',
        Key: {
            'twitterId' : userid
        }
    }
    dynamodb.get(queryParams,async function(err, data) {
        if (err) {
            console.error("Unable to query item. Error JSON:", JSON.stringify(err, null, 2));
            return res.status(500).send(err); // 发送错误响应
        } else {
            if (data.Item) {
                if (data.Item.address === undefined) {
                    return res.status(200).send({ credits: data.Item.credits + data.Item.total_credits, showConnect: true, lastUpdate:data.Item.lastUpdate });
                }
                // console.log("Query succeeded:", data.Item);
                return res.status(200).send({ credits: data.Item.credits + data.Item.total_credits, showConnect: false, lastUpdate:data.Item.lastUpdate });
            } else {
                // 如果未找到数据，添加新条目
                const currentTime = new Date().toISOString();
                let credits = 0;
                try{
                    const { tweetScore, retweetScore, likesOther, replyOther } = await fetchTweets(token, tokenSecret, username,userid);
                    credits = tweetScore + retweetScore + likesOther + replyOther;
                }catch (err) {
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                }
                const putParams = {
                    TableName: 'UserTable',
                    Item: {
                        'twitterId': userid,
                        'credits': credits,
                        'token' : token,
                        'tokenSecret': tokenSecret,
                        'lastUpdate': currentTime,
                        'total_credits':0
                    }
                };

                dynamodb.put(putParams, function(err, data) {
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                        return res.status(500).send(err); // 发送错误响应
                    } else {
                        // console.log("Added item:", JSON.stringify(data, null, 2));
                        // console.log(credits);
                        return res.status(200).send({ credits: credits,showConnect: true, lastUpdate:currentTime}); // 发送新创建的数据
                    }
                });
            }
        }
    })
    
});

app.post('/updateUserData',(req, res) => {
    const {userid,address} = req.body;
    const updateParams = {
        TableName: 'UserTable',
        Key: {
            'twitterId': userid
        },
        UpdateExpression: 'set useraddress = :address',
        ExpressionAttributeValues: {
            ':address': address
        },
        ReturnValues: 'UPDATED_NEW'
    };
    dynamodb.update(updateParams, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).send(err);
        } else {
            // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.status(200).send(data);
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
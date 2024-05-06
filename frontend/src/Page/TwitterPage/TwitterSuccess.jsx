import React,{ useEffect } from "react";
import { useLocation } from 'react-router-dom';
import config from "../../config/config";
const TwitterSuccess = ()=>{
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const encryptedToken = params.get('token');
        const encryptedTokenSecret = params.get('tokenSecret');
        const username = params.get('username');
        const twitterId = params.get('twitterId');
        // 确保所有数据都存在
        if (encryptedToken && encryptedTokenSecret && username && twitterId) {
            window.opener.postMessage({
                success: true,
                user: {
                    name: username,
                    token: encryptedToken,
                    tokenSecret: encryptedTokenSecret,
                    id: twitterId
                }
            },config.FRONTEND_ENDPOINT);
            window.close();
        } else {
            // 如果缺少任何数据，您可以选择发送失败消息或处理错误
            window.opener.postMessage({
                success: false,
                error: 'Missing data from Twitter authentication.'
            }, config.FRONTEND_ENDPOINT);
            window.close();
        }
    }, [location]);
    return <div>
        <h1>success</h1>
    </div>
}

export default TwitterSuccess;
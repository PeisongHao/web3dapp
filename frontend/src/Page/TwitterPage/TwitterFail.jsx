import React,{useEffect} from "react";
import config from "../../config/config";
const TwitterFail = ()=>{
    useEffect(() => {
        window.opener.postMessage({
            success: false
        }, config.FRONTEND_ENDPOINT);
        window.close();
    }, []);
    return <div>
        <h1>Fail</h1>
    </div>
}

export default TwitterFail;
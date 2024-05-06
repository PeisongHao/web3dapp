import config from "../../config/config";
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNOUT = 'SIGNOUT';

export const signin =() =>{
    return async dispatch =>{
        try{
            const handleMessage = (event) => {
                // console.log(event.data.user);
                if (event.origin === config.FRONTEND_ENDPOINT) {
                    if (event.data.success) {
                       dispatch({
                        type: SIGNIN_SUCCESS,
                        user: event.data.user.name,
                        encryptedToken: event.data.user.token,
                        encryptedTokenSecret: event.data.user.tokenSecret,
                        userid:event.data.user.id
                       })
                    } else if(event.data.success !== undefined &&event.data.success === false) {
                        dispatch({
                            type:SIGNIN_FAILURE
                        })
                    }
                }
            };
        
            // 打开新窗口
            window.open(`${config.BACKEND_ENDPOINT}/auth/twitter`, '_blank', 'width=500,height=600');
        
            // 添加事件监听器
            window.addEventListener('message', handleMessage);
        
            // 组件卸载时移除事件监听器
            return () => {
                window.removeEventListener('message', handleMessage);
            };
        }catch(error){
            dispatch({
                typeof: SIGNIN_FAILURE,
                error: error.response.data
            })
        }
    }
}

export const signout = () =>{
    return async dispatch =>{
        dispatch(
            {type:SIGNOUT}
        )
    }
}
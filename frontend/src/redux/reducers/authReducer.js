import { SIGNIN_SUCCESS,SIGNIN_FAILURE,SIGNOUT } from "../actions/authAction";

const initialState = {
    user: null,
    error: null,
    isLoggedIn:false,
    encryptedToken: null,
    encryptedTokenSecret: null,
    userid:null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null,
                isLoggedIn: true,
                encryptedToken: action.encryptedToken,
                encryptedTokenSecret: action.encryptedTokenSecret,
                userid: action.userid
            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        case SIGNOUT:
            return {
                user: null,
                error: null,
                isLoggedIn:false,
                encryptedToken: null,
                encryptedTokenSecret: null,
                userid:null
            }
        default:
            return state;
    }
}
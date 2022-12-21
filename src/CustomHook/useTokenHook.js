import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../store/slices/profileSlice';

export default function useTokenHook() {
    const dispatch = useDispatch();
    const profileReducer = useSelector(state => state.profile);

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (tokenString || profileReducer?.userData) {
            const userToken = JSON.parse(tokenString);
            if (!profileReducer?.userData) {
                dispatch(storeUserData(userToken))
            }
            return userToken
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}
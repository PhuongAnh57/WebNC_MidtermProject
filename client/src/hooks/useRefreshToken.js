import { useContext } from 'react';
import axios from 'api/axios';
import { AuthContext } from 'context/AuthProvider';
import { REFRESH_TOKEN } from 'utils/constants';

const useRefreshToken = () => {
    const { dispatch } = useContext(AuthContext);

    const refresh = async () => {
        try {
            const response = await axios.post('/api/refresh_token', {
                refreshToken: localStorage.getItem('refreshToken'),
            });

            dispatch({ type: REFRESH_TOKEN, payload: response.data });

            return response.data.accessToken;
        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
};

export default useRefreshToken;

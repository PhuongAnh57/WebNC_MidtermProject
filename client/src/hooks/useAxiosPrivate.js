import { axiosPrivate } from 'api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    console.log('here');

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                }

                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                console.log(prevRequest);
                console.log(error.response);

                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;

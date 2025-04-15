import {uniqBy} from 'lodash';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchdata';

function useMedia() {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      const authApiUrl = import.meta.env.VITE_AUTH_API;
      const userData = await Promise.all(
        uniqueUserIds.map(
          async (item) =>
            await fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );
      const userMap = userData.reduce((map, {user_id, username}) => {
        map[user_id] = username;
        return map;
      }, {});

      const newData = mediaData.map((item) => ({
        ...item,
        username: userMap[item.user_id],
      }));

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);
  return {mediaArray};
}

function useAuthentication() {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
  };
  return {postLogin};
}

function useUser() {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
    return userResult;
  };
  async function getUserByToken(token) {
    const url = import.meta.env.VITE_AUTH_API + '/users/token';
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    const userData = await fetchData(url, fetchOptions);
    return {userData};
  }
  return {getUserByToken, postUser};
}

// Export both hooks as named exports
export {useAuthentication, useMedia, useUser};

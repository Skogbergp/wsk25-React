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
  const postMedia = async (file, inputs, token) => {
    const url = import.meta.env.VITE_MEDIA_API + '/media';
    const data = {
      ...inputs,
      ...file,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchData(url, fetchOptions);
  };
  const deleteMedia = async (id) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    return fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    });
  };
  const modifyMedia = async (id, input) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    console.log('id', id);
    const url = import.meta.env.VITE_MEDIA_API + '/media/' + id;
    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer: ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };
    return await fetchData(url, fetchOptions);
  };
  return {mediaArray, postMedia, deleteMedia, modifyMedia};
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
function useFile() {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const url = import.meta.env.VITE_UPLOAD_SERVER + '/upload';
    console.log('url', url);
    console.log('token', token);
    console.log('file', file);
    console.log('formData', formData);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData,
    };
    const fileData = await fetchData(url, fetchOptions);
    return fileData;
  };

  return {postFile};
}
function useLike() {
  const getLikes = async () => {
    const url = import.meta.env.VITE_MEDIA_API + '/likes/';
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer: ' + window.localStorage.getItem('token'),
      },
    };
    return await fetchData(url, fetchOptions);
  };
  const postLike = async (id, token) => {
    const url = import.meta.env.VITE_MEDIA_API + '/likes/';
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      body: JSON.stringify({id}),
    };
    return await fetchData(url, fetchOptions);
  };
  const deleteLike = async (id, token) => {
    const url = import.meta.env.VITE_MEDIA_API + '/likes/' + id;
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      body: JSON.stringify({id}),
    };
    return await fetchData(url, fetchOptions);
  };

  return {postLike, deleteLike};
}

export {useAuthentication, useMedia, useUser, useFile, useLike};

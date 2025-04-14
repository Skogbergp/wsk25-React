import {fetchData} from '../utils/fetchdata';
import {useEffect, useState} from 'react';
import {uniqBy} from 'lodash';

function useMedia() {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      console.log('uniqueUserIds', uniqueUserIds);

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

export default useMedia;

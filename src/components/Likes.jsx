/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {useLike} from '../hooks/apiHooks';
import {func} from 'prop-types';

export default function Likes(props) {
  const {item} = props;
  const {user} = useUserContext();
  const [likes, setLikes] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const {getLikesByMediaId, postLike, deleteLike, getLikesByUser} = useLike();

  useEffect(() => {
    const fetchLikes = async () => {
      const result = await getLikesByMediaId(item.media_id);

      const userResult = await getLikesByUser(
        user.user_id,
        window.localStorage.getItem('token'),
      );
      setUserLikes(userResult);

      setLikes(result);
    };
    fetchLikes();
  }, []);

  console.log('userLikes', userLikes);

  async function handlePostLike() {
    const result = await postLike(
      item.media_id,
      window.localStorage.getItem('token'),
    );
  }
  function handleDeleteLike() {
    const likeId = userLikes.find((like) => like.media_id === item.media_id);
    const result = deleteLike(likeId, window.localStorage.getItem('token'));
    console.log('result', result);
  }

  return (
    <>
      <button type="button" onClick={handlePostLike}>
        ❤️
      </button>
      <button type="button" onClick={handleDeleteLike}>
        💔
      </button>
      <p>{likes ? likes.length : 0}</p>
    </>
  );
}

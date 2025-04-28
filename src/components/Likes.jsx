/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {useLike} from '../hooks/apiHooks';

export default function Likes(props) {
  const {item} = props;
  const {user} = useUserContext();
  const [likes, setLikes] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const {getLikesByMediaId, postLike, deleteLike, getLikesByUser} = useLike();

  const fetchLikes = async () => {
    const result = await getLikesByMediaId(item.media_id);
    const userResult = await getLikesByUser(
      user.user_id,
      window.localStorage.getItem('token'),
    );
    setUserLikes(userResult);
    setLikes(result);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  async function handlePostLike() {
    await postLike(item.media_id, window.localStorage.getItem('token'));
    await fetchLikes();
  }

  async function handleDeleteLike() {
    const liked = userLikes.find((like) => like.media_id === item.media_id);
    const likeId = liked.like_id;

    await deleteLike(likeId, window.localStorage.getItem('token'));
    await fetchLikes();
  }

  return (
    <>
      {userLikes.find((like) => like.media_id === item.media_id) ? (
        <button type="button" onClick={handleDeleteLike}>
          💔
        </button>
      ) : (
        <button type="button" onClick={handlePostLike}>
          ❤️
        </button>
      )}
      <div className="flex">
        <label>likes: </label>
        <p>{likes ? ' ' + likes.length : ' ' + 0}</p>
      </div>
    </>
  );
}

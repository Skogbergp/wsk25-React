import PropTypes from 'prop-types';
import {useLocation, useNavigate} from 'react-router';

function Single() {
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log('state', state);
  const item = state.item;
  return (
    <>
      {item.media_type.includes('video') ? (
        <video
          src={item.filename}
          controls
          style={{width: '100%', height: 'auto'}}
        />
      ) : (
        <img
          src={item.filename}
          alt={item.title}
          style={{width: '100%', height: 'auto'}}
        />
      )}
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Created at: {new Date(item.created_at).toLocaleString()}</p>
      <p>Uploaded by: {item.username}</p>
      <p>Filesize: {item.filesize} bytes</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

Single.propTypes = {};

export default Single;

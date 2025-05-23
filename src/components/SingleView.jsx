import PropTypes from 'prop-types';
import Likes from './Likes';

function SingleView(props) {
  const {item, setSelectedItem} = props;
  function closeDialog() {
    setSelectedItem(null);
  }
  return (
    <>
      {item && (
        <dialog open={item} className="fixed top-1/2 left-1/2">
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
          <p>Filesize: {item.filesize} bytes</p>
          <Likes item={item} />
          <button onClick={closeDialog}>Close</button>
        </dialog>
      )}
    </>
  );
}

PropTypes.SingleView = {
  item: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
};
export default SingleView;

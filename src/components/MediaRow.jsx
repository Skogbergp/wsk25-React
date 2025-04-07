import PropTypes from 'prop-types';
import SingleView from './SingleView';

function MediaRow(props) {
  const {item, setSelectedItem} = props;
  console.log(item);
  return (
    <tr>
      <td>
        <img
          src={item.item.thumbnail}
          alt={item.item.title}
          style={{width: '100px', height: 'auto'}}
        />
      </td>
      <td>{item.item.title}</td>
      <td>{item.item.description}</td>
      <td>{new Date(item.item.created_at).toLocaleString()}</td>
      <td>{item.item.filesize}</td>
      <td>{item.item.media_type}</td>
      <td>
        <button onClick={setSelectedItem}>select</button>
      </td>
    </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default MediaRow;

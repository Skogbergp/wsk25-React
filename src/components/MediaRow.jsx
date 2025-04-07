import PropTypes from 'prop-types';

function MediaRow(props) {
  const items = props;
  console.log(items);
  return (
    <tr>
      <td>
        <img
          src={items.item.thumbnail}
          alt={items.item.title}
          style={{width: '100px', height: 'auto'}}
        />
      </td>
      <td>{items.item.title}</td>
      <td>{items.item.description}</td>
      <td>{new Date(items.item.created_at).toLocaleString()}</td>
      <td>{items.item.filesize}</td>
      <td>{items.item.media_type}</td>
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

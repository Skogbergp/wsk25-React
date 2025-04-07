import PropTypes from 'prop-types';

function MediaRow(props) {
  const items = props;
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
  item: PropTypes.object.isRequired,
};

export default MediaRow;

import PropTypes from 'prop-types';

function MediaRow(props) {
  const {item, setSelectedItem} = props;
  function handleClick() {
    console.log(item);
    setSelectedItem(item);
  }
  return (
    <tr>
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{width: '100px', height: 'auto'}}
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button onClick={handleClick}>view</button>
      </td>
    </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MediaRow;

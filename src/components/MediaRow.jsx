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

export default MediaRow;

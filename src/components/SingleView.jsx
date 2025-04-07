function SingleView(props) {
  const {item, setSelectedItem} = props;
  return (
    <dialog>

        <img
          src={item.thumbnail}
          alt={item.title}
          style={{width: '100%', height: 'auto'}}
        />
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p>Created at: {new Date(item.created_at).toLocaleString()}</p>
        <p>Filesize: {item.filesize} bytes</p>
        {item.media_type.includes("image"): <img src={item.item.filename} alt={item.title} />? <video src={item.item.filename}></video>}
        <button onClick={() => setSelectedItem(null)}/>Close</button>;

    </dialog>
  );
}
export default SingleView;
// This component is a dialog that displays the details of a media item when clicked.

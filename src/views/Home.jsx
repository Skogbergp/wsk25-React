import {useState} from 'react';
import MediaRow from '../components/MediaRow.jsx';
import SingleView from '../components/SingleView.jsx';
import {useMedia} from '../hooks/apiHooks.jsx';
import '../index.css';

function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const mediaArray = useMedia().mediaArray;
  const {deleteMedia, modifyMedia} = useMedia();

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr className="*:border-2 *:border-stone-200 *:p-4">
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Uploaded By</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
              deleteMedia={deleteMedia}
              modifyMedia={modifyMedia}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
}
export default Home;

import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useState} from 'react';
import Likes from './Likes.jsx';

function MediaRow(props) {
  const {user} = useUserContext();

  const navigate = useNavigate();
  const {item, deleteMedia, modifyMedia} = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({...item});

  function handleDelete() {
    deleteMedia(item.media_id);
    navigate('/');
  }

  function handleEditToggle() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(e) {
    const {name, value} = e.target;
    setEditedItem((prev) => ({...prev, [name]: value}));
  }

  function handleSave() {
    console.log('Save changes:', editedItem);
    setIsEditing(false);
    modifyMedia(item.media_id, editedItem);
    // Add logic to save changes (e.g., API call)
  }

  function handleCancel() {
    setEditedItem({...item});
    setIsEditing(false);
  }

  return (
    <tr className="border-2 border-stone-200">
      <td className="border border-stone-300">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-2xs object-cover"
        />
      </td>
      {isEditing ? (
        <>
          <td className="border border-stone-300">
            <input
              type="text"
              name="title"
              value={editedItem.title}
              onChange={handleInputChange}
              className="border p-1"
            />
          </td>
          <td className="border border-stone-300">
            <input
              type="text"
              name="description"
              value={editedItem.description}
              onChange={handleInputChange}
              className="border p-1"
            />
          </td>
          <td className="border border-stone-300">{item.username}</td>
          <td className="border border-stone-300">
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </td>
          <td className="border border-stone-300">{item.filesize}</td>
          <td className="border border-stone-300">{item.media_type}</td>
          <td className="flex gap-2 border border-stone-300 p-4">
            <button
              className="hover:bg-green-500 hover:text-stone-950"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="hover:bg-gray-500 hover:text-stone-950"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="border border-stone-300">{item.title}</td>
          <td className="border border-stone-300">{item.description}</td>
          <td className="border border-stone-300">{item.username}</td>
          <td className="border border-stone-300">
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </td>
          <td className="border border-stone-300">{item.filesize}</td>
          <td className="border border-stone-300">{item.media_type}</td>
          <td className="flex gap-2 border border-stone-300 p-4">
            <Likes item={item} />
            <Link
              to="/single"
              state={{item}}
              className="hover:bg-stone-50 hover:text-stone-950"
            >
              Show
            </Link>
            {user && (
              <>
                {user.user_id === item.user_id && (
                  <>
                    <button
                      className="hover:bg-sky-500 hover:text-stone-950"
                      type="button"
                      onClick={handleEditToggle}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:bg-red-600 hover:text-stone-950"
                      type="button"
                      onClick={() => {
                        if (
                          prompt('Are you sure you want to delete this media?')
                        ) {
                          handleDelete();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </td>
        </>
      )}
    </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MediaRow;

import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

function MediaRow(props) {
  const {user} = useUserContext();

  const {item} = props;
  return (
    <tr className="*:border-2 *:border-stone-200 *:p-4">
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-2xs object-cover"
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <div className="*:flex *:gap-2 *:p-4">
        <td className="">
          <Link
            to="/single"
            state={{item}}
            className="hover:bg-stone-50 hover:text-stone-950"
          >
            Show
          </Link>
          {user && (
            <>
              <button
                className="hover:bg-sky-500 hover:text-stone-950"
                type="button"
                onClick={console.log('edit')}
              >
                Edit
              </button>
              <button
                className="hover:bg-red-600 hover:text-stone-950"
                type="button"
                onClick={console.log('delete')}
              >
                delete
              </button>
            </>
          )}
        </td>
      </div>
    </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MediaRow;

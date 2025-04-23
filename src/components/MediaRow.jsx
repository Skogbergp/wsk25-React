import PropTypes from 'prop-types';
import {Link} from 'react-router';

function MediaRow(props) {
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
      <td className="p-0!">
        <Link
          to="/single"
          state={{item}}
          className="p-8 hover:bg-stone-50 hover:text-stone-950"
          onClick={(event) => {
            event.preventDefault();
            si;
          }}
        >
          Show
        </Link>
      </td>
    </tr>
  );
}

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MediaRow;

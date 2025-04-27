import {useUserContext} from '../hooks/contextHooks';

export default function Likes() {
  const {user} = useUserContext();

  return (
    <>
      <button>❤️</button>
      <p>1000</p>
    </>
  );
}

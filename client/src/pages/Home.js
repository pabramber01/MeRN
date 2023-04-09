import { PublicationList } from '../publication';
import { Separator } from '../layout';
import { useLocation } from 'react-router-dom';

function Home() {
  const { search } = useLocation();
  const q = new URLSearchParams(search).get('q');

  const type = q === null ? 'getAllPublications' : `getAllPublications=${q}`;

  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Recent Publications</h1>
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <PublicationList page={type} />
    </>
  );
}

export default Home;

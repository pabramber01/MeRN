import { PublicationList } from '../publication';
import { Separator } from '../layout';

function Home() {
  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Recent Publications</h1>
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <PublicationList page="home" />
    </>
  );
}

export default Home;

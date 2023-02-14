import { Feed } from '../features';

function Home() {
  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Recent Publications</h1>
        <hr className="border border-danger border-1 m-0 mb-2" />
      </div>
      <Feed page="home" />
    </>
  );
}

export default Home;

import landing from '../assests/images/landing.svg';
import { Authentication } from '../features';

function Landing() {
  return (
    <div className="container vh-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-lg-6 d-none d-lg-block">
          <img src={landing} alt="Gallery" className="img-fluid" />
        </div>
        <div className="col-lg-4">
          <Authentication />
        </div>
      </div>
    </div>
  );
}

export default Landing;

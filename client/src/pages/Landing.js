import landing from '../assets/images/landing.svg';
import { AuthForm } from '../auth';

function Landing() {
  return (
    <div className="container vh-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-lg-6 d-none d-lg-block">
          <img src={landing} alt="Gallery" className="img-fluid" />
        </div>
        <div className="col-sm-12 col-md-7 col-lg-5 col-xl-4">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default Landing;

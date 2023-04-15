import not_found from '../assets/images/not_found.svg';

function ErrorNotFound() {
  return (
    <div className="container vh-100">
      <div className="row h-100 justify-content-center align-items-center text-center">
        <div className="col-md-6">
          <img src={not_found} className="img-fluid" alt="Page not found" />
          <div className="mt-5">
            <h1 className="fst-italic fw-bold">Oops...</h1>
            <h2>This page does not exist</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorNotFound;

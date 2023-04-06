import empty from '../../assets/images/empty.svg';

function EmptyData() {
  return (
    <div className="row justify-content-center text-center">
      <div className="col-sm-7 col-md-6 col-lg-5 col-xl-5 col-xxl-5">
        <img src={empty} className="img-fluid" alt="Empty data" />
        <div className="mt-3">
          <h1 className="fst-italic fw-bold">Oops...</h1>
          <h2>This looks very empty</h2>
        </div>
      </div>
    </div>
  );
}

export default EmptyData;

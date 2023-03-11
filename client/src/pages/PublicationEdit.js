import { useLocation } from 'react-router-dom';
import { PublicationForm } from '../publication';

function PublicationEdit() {
  const { pathname } = useLocation();
  const type = pathname.split('/').slice(-1)[0];

  return (
    <div className="row justify-content-center">
      <div className="col-md-12 col-xl-6">
        <PublicationForm type={type} />
      </div>
    </div>
  );
}

export default PublicationEdit;

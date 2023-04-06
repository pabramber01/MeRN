import { useEffect } from 'react';

function Modal({ id, title, children, footer, button, buttonTxt }) {
  useEffect(() => {
    return () => {
      const body = document.getElementsByTagName('body')[0];
      const backdrop = document.getElementsByClassName('modal-backdrop')[0];

      if (backdrop) {
        backdrop.remove();
        body.classList.remove('modal-open');
        body.style = '';
      }
    };
  }, []);

  return (
    <>
      {button || (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#${id}`}
        >
          {buttonTxt}
        </button>
      )}

      <div className="modal fade" id={id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                id="closeModal"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modal;

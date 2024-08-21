import React from 'react';
import PropTypes from 'prop-types';

const Modal ({ show, onClose, onDelete}) => {
  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure?</h5>
            <button onClick={onClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>If you delete this contact, it will be gone forever!</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
        </div>  
      </div>
    </div?
    
  );
  
};

Modal.propTypes = {
  show: PropTypes.bool.isRequire;
  onClose: PropTypes.bool.isRequired;
  onDelete: PropTypes.bool.required;
};

export default Modal;

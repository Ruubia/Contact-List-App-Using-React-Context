import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ContactCard = ({ id, name, address, phone, email, onDeleteClick }) => {
    return (
        <li className="list-group-item">
            <div className="row w-100">
                <div className="col-12 col-sm-6 col-md-3 px-0">
                    <img src="https://picsum.photos/300/300" className="rounded-circle mx-auto d-block img-fluid" />
                </div>
                <div className="col-12 col-sm-6 col-md-9 text-sm-left d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <h5 className="mx-4 my-2">{name}</h5>
                        <div className="mb-2">
                            <i className="fas fa-map-marker-alt fa-lg text-muted mr-3"></i>
                            <span className="text-muted p-2">{address}</span>
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-phone text-muted mr-3"></i>
                            <span className="text-muted small  p-2">{phone}</span>
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-envelope text-muted mr-3"></i>
                            <span className="text-muted small text-truncate  p-2">{email}</span>
                        </div>
                    </div>
                    <div>
                        <Link to={`/edit/${id}`} className="btn"><i className="fas fa-pencil-alt mr-3"></i></Link>
                        <button className="btn" onClick={onDeleteClick}><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </li>
    );
};

ContactCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};
import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const AddContact = () => {
	const { store, actions } = useContext (Context);
	const [ contact, setContact] = useState ({
	         name: "",
             email: "",
             phone: "",
             address: ""
	});
	const navigate = useNavigate();
    	const { id } = useParams();
	
	useEffect(() => {
	    if (id) {
		const selectedContact = store.contacts.find(contact => contact.id === parseInt(id));
		if (selectedContact) {
		   setContact({
		      name: selectedContact.name,
              email: selectedContact.email,
              phone: selectedContact.phone,
              address: selectedContact.address
		   });
		}
	    }
	}, [id, store.contacts]);
	
	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};
			
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación para asegurarse de que todos los campos están completos
        if (!contact.name || !contact.email || !contact.phone || !contact.address) {
            alert("Please fill in all fields.");
            return;
        }
        
        if (id) {
            actions.updateContact(parseInt(id), contact)
                .then(() => {
                    navigate("/");
                })
                .catch(error => {
                    console.error("Error updating contact:", error);
                });
        } else {
            actions.createContact(contact)
                .then(() => {
                    navigate("/");
                })
                .catch(error => {
                    console.error("Error creating contact:", error);
                });
        }
    };
    
    return (
        <div className="container">
            <div>
                <h1 className="text-center mt-5">{id ? "Edit Contact" : "Add a new contact"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" placeholder="Full Name" name="name" value={contact.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email" value={contact.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="phone" className="form-control" placeholder="Enter phone" name="phone" value={contact.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Enter address" name="address" value={contact.address} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary form-control">{id ? "Update" : "Save"}</button>
                    <Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
                </form>
            </div>
        </div>
    );
};

import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { ContactCard } from "../component/contactCard";
import { Context } from "../store/appContext";
import Modal from "../component/modal";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const openModal = (contact) => {
        setContactToDelete(contact);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setContactToDelete(null);
    };

    const deleteContact = () => {
        if (contactToDelete) {
            actions.deleteContact(contactToDelete.id)
                .then(() => {
                    closeModal();
                })
                .catch(error => {
                    console.error("Error deleting contact:", error);
                });
        }
    };

    useEffect(() => {
        actions.getContacts()
            .catch(error => {
                console.error("Error getting contacts:", error);
            });
    }, [actions]);

    return (
        <div className="container">
            <div>
                <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                    <ul className="list-group pull-down" id="contact-list">
                        {store.contacts.map((item, index) => (
                            <ContactCard 
                                key={index} 
                                name={item.name} 
                                address={item.address} 
                                phone={item.phone} 
                                email={item.email} 
                                onDeleteClick={() => openModal(item)}
                                id={item.id}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <Modal show={showModal} onClose={closeModal} onDelete={deleteContact} />
        </div>
    );
};

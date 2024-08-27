const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
		   userExists: () => {
                      return fetch("https://playground.4geeks.com/contact/agendas/Ruubia", {
                        method: "GET",
                        headers: {
                           "Content-type": "application/json"
                        }
                   })
                   .then(resp => {
                    	if (resp.status === 404) {
                          return false;
                        }
                        return resp.ok;
                    })
                    .catch(error => {
                       console.error("Error checking user existence:", error);
                       return false;
                     });
                },
		createUser: () => {
                    return fetch("https://playground.4geeks.com/contact/agendas/Ruubia", {
                       method: "POST",
                       headers: {
                         "Content-type": "application/json"
                    },
                    body: JSON.stringify({})
                })
                .then(resp => {
                    if (!resp.ok) {
                        if (resp.status === 400) {
                            return resp.json().then(errorData => {
                                console.error("Error creating user:", errorData.detail);
                                return;
                            });
                        }
                        throw new Error(`Error status: ${resp.status}`);
                    }
                })
                .catch(error => {
                    console.error("Error creating user:", error);
                });
            },
	    getContacts: () => {
                const actions = getActions();
                return actions.userExists()
                    .then(exists => {
                        if (!exists) {
                            return actions.createUser();
                        }
                    })
                    .then(() => {
                        return fetch("https://playground.4geeks.com/contact/agendas/Ruubia/contacts", {
                            method: "GET",
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`Error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        console.log(data);
                        setStore({ contacts: data.contacts });
                        return getStore().contacts;
                    })
                    .catch(error => {
                        console.error("Error getting contacts:", error);
                    });
            },
	    createContact: (contact) => {
                return fetch("https://playground.4geeks.com/contact/agendas/Ruubia/contacts", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(contact)
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error(`Error status: ${resp.status}`);
                    }
                    return getActions().getContacts();
                })
                .catch(error => {
                    console.error("Error creating contact:", error);
                });
            },
	    deleteContact: (id) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/Ruubia/contacts/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error(`Error status: ${resp.status}`);
                    }
                    return getActions().getContacts();
                })
                .catch(error => {
                    console.error("Error deleting contact:", error);
                });
            },
	    updateContact: (id, updatedContact) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/Ruubia/contacts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(updatedContact)
                })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error(`Error status: ${resp.status}`);
                    }
                    return getActions().getContacts();
                })
                .catch(error => {
                    console.error("Error updating contact:", error);
                });
            }
        }
	};
};

export default getState;
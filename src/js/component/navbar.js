import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
		 <div className="container-fluid justify-content-end mx-4">
		   <Link to="/add" className="text-decoration-none">	
		     <button className="btn btn-primary">Add new contact</button>
	           </Link>
		 </div>
		</nav>
   );
};

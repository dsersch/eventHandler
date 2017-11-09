import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			{props.currentUser
 				? (
					<span>
						<Link className="navLink" to="/profile">Profile</Link>
						<Link className="navLink" to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
						<Link className="navLink" to="/login">Log In</Link>
						<Link className="navLink" to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
}

export default NavBar
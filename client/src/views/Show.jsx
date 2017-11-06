import React from 'react'
import { Link } from 'react-router-dom'

const Show = (props) => {
	return (
		<div className='Show'>
			<h1>Profile</h1>
			<h2>{props.currentUser.name}</h2>
			<h3>{props.currentUser.email}</h3>
			<Link to="/edit">Update Profile</Link>
		</div>
	)
}

export default Show
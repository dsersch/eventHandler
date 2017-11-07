import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Show extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			events: []
		}
	}

	getEvents(){
		axios({
			method: 'get',
			url: `/api/users/${this.props.currentUser._id}/events`
		}).then((res)=>{
			console.log(res.data)
			this.setState({
				events: res.data
			})
		})
	}

	componentDidMount(){
		this.getEvents()
	}


	render(){
		return (
			<div className='Show'>
				<h1>{this.props.currentUser.name}</h1>
				<h2>{this.props.currentUser.email}</h2>
				<Link to="/create-event">Add an Event</Link>
				<Link to="/edit">Update Profile</Link>
				<Link to="/delete">Delete Account</Link>
				{this.state.events.map((event, index)=>{
					return (
						<div key={event.title} className="userEvents delete-button">
							<Link to={`/show-event/${event._id}`} key={index}>{event.title}</Link>
							
						</div>
					)
				})}
			</div>
		)
	}
} 

export default Show
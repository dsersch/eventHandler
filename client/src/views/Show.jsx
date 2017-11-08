import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Friends from './Friends'

class Show extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			events: [],
			showFriends: false
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

	onFriendsClick(evt){
		evt.preventDefault()
		this.setState({
			showFriends: !this.state.showFriends
		})
	}


	render(){
		return (
			<div className='Show'>
				<h1>{this.props.currentUser.name}</h1>
				<h2>{this.props.currentUser.email}</h2>
				<Link to="/create-event">Add an Event</Link>
				<Link to="/edit">Update Profile</Link>
				<Link to="/delete">Delete Account</Link>
				<Link to="/" onClick={this.onFriendsClick.bind(this)}>Friends</Link>
				{this.state.showFriends
					? <Friends currentUser={this.props.currentUser} />
					: null
				}
				<h2>Hosted Events</h2>
				<ul>
				{this.state.events.map((event, index)=>{
					return (
						<li key={event._id}><Link to={`/show-event/${event._id}`} key={index}>{event.title}</Link></li>
					)
				})}
				</ul>
			</div>
		)
	}
} 

export default Show
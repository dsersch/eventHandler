import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Friends from './Friends'
import FollowingEvents from './FollowingEvents'

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
				<div className="ProfileInfo">
					<h1>{this.props.currentUser.name}</h1>
					<h2>{this.props.currentUser.email}</h2>
				</div>
				<div className="ShowNav">
					<Link className="navLink" to="/create-event">Add an Event</Link>
					<Link className="navLink" to="/edit">Update Profile</Link>
					<Link className="navLink" to="/delete">Delete Account</Link>
					<Link className="navLink" to="/" onClick={this.onFriendsClick.bind(this)}>Friends</Link>
				</div>
				
				{this.state.showFriends
					? <Friends currentUser={this.props.currentUser} />
					: null
				}
				<div className="events">
					<div className="row">
						<div className="column hosted">
						<h3>Hosted Events</h3>
							<ul>
							{this.state.events.map((event, index)=>{
								return (
									<li key={event._id}><Link to={`/show-event/${event._id}`} key={index}>{event.title}</Link> on {event.date} at {event.time}</li>
								)
							})}
							</ul>
						</div>
						<div className="column friend">
							<FollowingEvents currentUser={this.props.currentUser}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
} 

export default Show
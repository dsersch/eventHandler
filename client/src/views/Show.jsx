import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Friends from './Friends'
import FollowingEvents from './FollowingEvents'
import SearchUser from './SearchUser'

var sectionStyle = {
	backgroundImage: "url(" + require('../green-background.jpg') + ")",
	backgroundSize: '100% 100%',
	backgroundRepeat: 'no-repeat'
  };

class Show extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			events: [],
			showFriends: true
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

	// onFriendsClick(evt){
	// 	evt.preventDefault()
	// 	this.setState({
	// 		showFriends: !this.state.showFriends
	// 	})
	// }


	onAddSuccess(){
	}


	render(){
		return (
			<div className='Show'>
				<div className="ProfileInfo" style={sectionStyle}>
					<h1>{this.props.currentUser.name}</h1>
					<h2>{this.props.currentUser.email}</h2>
				</div>
				<div className="ShowNav">
					<Link className="navLink" to="/create-event">Add an Event</Link>
					<Link className="navLink" to="/edit">Update Profile</Link>
					<Link className="navLink" to="/delete">Delete Account</Link>
					<SearchUser currentUser={this.props.currentUser} onAddSuccess={this.onAddSuccess.bind(this)} />
				</div>
				
				{this.state.showFriends
					? <Friends  currentUser={this.props.currentUser} />
					: null
				}
				<div className="row events">
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
					<div className="column friends">
						<FollowingEvents currentUser={this.props.currentUser}/>
					</div>	
				</div>
			</div>
		)
	}
} 

export default Show
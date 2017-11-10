import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Friends from './Friends'
import SearchUser from './SearchUser'

var sectionStyle = {
	backgroundImage: "url(" + require('../blue-background.jpg') + ")",
	backgroundSize: '100% 100%',
	backgroundRepeat: 'no-repeat'
}

var secondSectionStyle = {
	backgroundImage: "url(" + require('../third-background.jpeg') + ")",
	backgroundSize: '100% 100%',
	backgroundRepeat: 'no-repeat'
  };

class Show extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user: {},
			events: [],
			friendEvents: [],
			showFriends: true
		}
	}

	updateFriendsEvents(){
		this.setState({
			friendEvents: []
		})
		axios({
			method: 'get',
			url: `/api/users/${this.props.currentUser._id}`
		}).then((res)=>{
			res.data.following.map((following)=>{
				return axios({
					method: 'get',
					url: `/api/users/${following._id}/events`,
				}).then((evtArr)=>{
					evtArr.data.forEach((event)=>{
						this.setState({
							friendEvents: [
								...this.state.friendEvents, event
							]
						})
					})
				})
			})
		})
	}

	getUser(){
		axios({
			method: 'get',
			url: `/api/users/${this.props.currentUser._id}`
		}).then((res)=>{
			this.setState({
				user: res.data
			})
		})
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

	getFriendEvents(){
		this.props.currentUser.following.map((following)=>{
            return axios({
                method: 'get',
                url: `/api/users/${following}/events`,
            }).then((evtArr)=>{
                evtArr.data.forEach((event)=>{
                    this.setState({
                        friendEvents: [
                            ...this.state.friendEvents, event
                        ]
                    })
                })
            })
        })
	}

	componentDidMount(){
		this.getUser()
		this.getFriendEvents()
		this.getEvents()
		
	}

	onFriendsClick(evt){
		evt.preventDefault()
		this.setState({
			showFriends: !this.state.showFriends
		})
	}

	onDeleteSuccess(){
		this.updateFriendsEvents()
	}


	onAddSuccess(){
		this.getUser()
		this.updateFriendsEvents()
	}

	onAdd(){
		this.props.onAddApp()
	}
		

	render(){
		console.log(this.props)
		return (
			<div className='Show'>
				<div className="ProfileInfo" style={sectionStyle}>
					<h1>{this.props.currentUser.name}</h1>
					<h2>{this.props.currentUser.email}</h2>
					<img className="profileImage" src={require('../default-user.png')} alt=""/>
				</div>
				<div className="ShowNav">
					<Link className="navLink" to="/create-event">Add an Event</Link>
					<Link className="navLink" to="/edit">Update Profile</Link>
					<Link className="navLink" to="/delete">Delete Account</Link>
					<Link className="navLink" to="/" onClick={this.onFriendsClick.bind(this)}>Friends</Link>
					<SearchUser currentUser={this.props.currentUser} onAddSuccess={this.onAddSuccess.bind(this)} onAdd={this.onAdd.bind(this)} />
				</div>
				<div className="eventsBanner" style={secondSectionStyle}>
					<h1>Events</h1>
				</div>
				<div className="row events">
					<div className="column hosted">
						<div className="hostedHeader">
							<h3>Hosted Events</h3>
						</div>
						<ul className="hostedUL">
						{this.state.events.map((event, index)=>{
							return (
								<li key={event._id}><Link to={`/show-event/${event._id}`} key={index}>{event.title}</Link> on {event.date} at {event.time}</li>
							)
						})}
						</ul>
					</div>
					<div className="column friends">
						<div className="FollowingEvents">
							<div className="friendsEventsHeader">
								<h3>Friend's Events</h3>
							</div>
							<ul className="friendsUL">
								{this.state.friendEvents.map((event, index)=>{
									return (
										<li key={event._id}><Link 
										to={`/show-event/${event._id}`}
										key={index}>{event.title}</Link> hosted by: {event.user.name}
										{event.attending.map((attendingUser)=>{
											if (attendingUser._id === this.props.currentUser._id){
												return <span className="attending" key={event._id}>  Attending</span>
											} else {
												return null
											}
										})}
									</li>
									)
								})}
							</ul>
						</div>
					</div>	
				</div>
				{this.state.showFriends
						? <Friends  {...this.props} currentUser={this.props.currentUser} onDeleteSuccess={this.onDeleteSuccess.bind(this)}/>
					: null
				}
			</div>
		)
	}
} 

export default Show
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class FollowingEvents extends React.Component{
    state = {
        friendEvents: []
    }

    componentDidMount(){
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

    render(){
        return (
            <div className="FollowingEvents">
                <h3>Friend's Events</h3>
                <ul>
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
        )
    }
}

export default FollowingEvents
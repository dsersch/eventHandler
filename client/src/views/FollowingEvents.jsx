import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class FollowingEvents extends React.Component{
    state = {
        friendEvents: []
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `/api/users/${this.props.currentUser._id}`
        }).then((user)=>{
            user.data.following.map((following)=>{
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

    render(){
        return (
            <div className="FollowingEvents">
                <h3>Friend's Events</h3>
                <ul>
                    {this.state.friendEvents.map((event, index)=>{
                        return (
                            <li key={event._id}><Link to={`/show-event/${event._id}`} key={index}>{event.title}</Link> hosted by: {event.user.name}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default FollowingEvents
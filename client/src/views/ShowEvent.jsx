import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ShowEvent extends React.Component{
    state = {
        event: {
            attending: []
        },
        creatorId: '',
    }

    componentDidMount(){
        const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/events/${id}`
        }).then((res)=>{
            this.setState({
                event: res.data,
                creatorId: res.data.user._id
            })
        })
    }

    onDeleteClick(evt){
        evt.preventDefault()
        const { id } = this.props.match.params
        axios({
            method: 'delete',
            url: `/api/events/${id}`
        }).then((res)=>{
            this.props.history.push('/profile')
        })
    }
    
    onAttendClick(evt){
        evt.preventDefault()
        const { id } = this.props.match.params
        axios({
            method: 'post',
            url: `/api/events/${id}`,
            data: {id: this.props.currentUser._id}
        }).then((res)=>{
            this.setState({
                event: res.data.attendingUpdated
            })
        })
    }

    onNotGoingClick(evt){
        evt.preventDefault()
        const { id } = this.props.match.params
        axios({
            method: 'post',
            url: `/api/events/${id}/unattend`,
            data: {id: this.props.currentUser._id}
        }).then((res)=>{
            this.setState({
                event: res.data.event
            })
        })
    }
    
    render(){
        const userId = this.props.currentUser._id
        const creatorId = this.state.creatorId
        const { title, body, location, time, date } = this.state.event
        const { id } = this.props.match.params
        if (userId === creatorId) {
            return (
                <div className="ShowEvent">
                    
                    <Link to={`/edit-event/${id}`}>Edit Event</Link>
                    <Link to="/" onClick={this.onDeleteClick.bind(this)}>Delete</Link>
                    <h1>{title}</h1>
                    <h3>Location: {location}</h3>
                    <h3>Time: {time}</h3>
                    <h3>Date: {date}</h3>
                    <p>{body}</p>
                </div>
            )
        } else {
            return (
                <div className="ShowEvent">
                    <Link to="/" onClick={this.onAttendClick.bind(this)}>Attend</Link>
                    <Link to="/" onClick={this.onNotGoingClick.bind(this)}>Can't Make It</Link>
                    <h1>{title}</h1>
                    
                    <h4>Attending: {this.state.event.attending.length}</h4>
                    <h3>Location: {location}</h3>
                    <h3>Time: {time}</h3>
                    <h3>Date: {date}</h3>
                    <p>{body}</p>
                </div>
            )
        }
        
    }
}

export default ShowEvent
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ShowEvent extends React.Component{
    state = {
        event: {},
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
            this.setState({
                event: {}
            })
            this.props.history.push('/profile')
        })
    }
    
    
    render(){
        const userId = this.props.currentUser._id
        const creatorId = this.state.creatorId
        console.log('creator id = ' + this.state.creatorId)
        const { title, body } = this.state.event
        const { id } = this.props.match.params
        if (userId === creatorId) {
            return (
                <div className="ShowEvent">
                    <h1>{title}</h1>
                    <Link to={`/edit-event/${id}`}>Edit Event</Link>
                    <Link to="/" onClick={this.onDeleteClick.bind(this)}>Delete</Link>
                    <p>{body}</p>
                </div>
            )
        } else {
            return (
                <div className="ShowEvent">
                    <h1>{title}</h1>
                    <p>{body}</p>
                </div>
            )
        }
        
    }
}

export default ShowEvent
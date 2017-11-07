import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ShowEvent extends React.Component{
    state = {
        event: {}
    }

    componentDidMount(){
        const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/events/${id}`
        }).then((res)=>{
            this.setState({
                event: res.data
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
        const { title, body } = this.state.event
        const { id } = this.props.match.params
        return (
            <div className="ShowEvent">
                <h1>{title}</h1>
                <Link to={`/edit-event/${id}`}>Edit Event</Link>
                <Link to="/" onClick={this.onDeleteClick.bind(this)}>Delete</Link>
                <p>{body}</p>
            </div>
        )
    }
}

export default ShowEvent
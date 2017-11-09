import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class NavCreator extends React.Component{
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

    render(){
        const { id } = this.props.match.params
        return (
            <div className="NavCreator">
                <Link to={`/edit-event/${id}`}>Edit Event</Link>
                <Link to="/" onClick={this.onDeleteClick.bind(this)}>Delete</Link>
            </div>
        )
    }
}

export default NavCreator
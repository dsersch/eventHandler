import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class NavViewer extends React.Component{

    state = {
        attending: false
    }

    componentDidMount(){
        console.log(this.props.match.params)
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
            this.props.history.push('/profile')
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
            this.props.history.push('/profile')
        })
    }

    render(){
        return (
            <div className="NavViewer">
                <Link to="/" onClick={this.onAttendClick.bind(this)}>Attend</Link>
                <Link to="/" onClick={this.onNotGoingClick.bind(this)}>Can't Make It</Link>
            </div>
        )
    }
}

export default NavViewer
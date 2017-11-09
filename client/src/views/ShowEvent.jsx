import React from 'react'
import axios from 'axios'
import NavCreator from './NavCreator'
import NavViewer from './NavViewer'

class ShowEvent extends React.Component{
    state = {
        event: {
            attending: []
        },
        creatorId: ''
    }

    componentDidMount(){
        const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/events/${id}`
        }).then((res)=>{
            this.setState({
                event: res.data,
                creatorId: res.data.user._id,
            })
        })
    }
    
    render(){
        console.log(this.props.currentUser.following)
        const userId = this.props.currentUser._id
        const creatorId = this.state.creatorId
        const { title, body, location, time, date, attending } = this.state.event
        return (
            <div className="ShowEvent">
                {userId === creatorId
                    ? <NavCreator {...this.props} />
                    : <NavViewer {...this.props} />
                }
                <h1>{title}</h1>
                <h4>Attending: {attending.length}</h4>
                <h3>Location: {location}</h3>
                <h3>Time: {time}</h3>
                <h3>Date: {date}</h3>
                <p>{body}</p>
                <ul>
                    {attending.map((el)=>{
                        
                        return <li key={el._id}>{el.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ShowEvent
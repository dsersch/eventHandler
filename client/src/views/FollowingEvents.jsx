import React from 'react'
import axios from 'axios'

class FollowingEvents extends React.Component{
    state = {
        events: []
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `/api/users/${this.props.currentUser._id}`
        }).then((res)=>{
            res.data.following.map((fol)=>{
                axios({
                    method: 'get',
                    url: `/api/users/${fol._id}/events`
                }).then((res)=>{
                    var arr = []
                    res.data.map((event)=>{
                        arr.push(event)
                    })
                    console.log(arr)
                })
            })
        })
    }

    render(){
        console.log(this.state.events)
        return (
            <div className="FollowingEvents">
                <h3>Friend's Events</h3>
            </div>
        )
    }
}

export default FollowingEvents
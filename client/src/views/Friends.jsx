import React from 'react'
import axios from 'axios'
import SearchUser from './SearchUser'

class Friends extends React.Component{
    state= {
        followers: [],
        following: []
    }

    getFollowInfo(){
        axios({
            method: 'get',
            url: `/api/users/${this.props.currentUser._id}`
        }).then((res)=>{
            this.setState({
                followers: res.data.followers,
                following: res.data.following
            })
        })
    }

    componentDidMount(){
        this.getFollowInfo()
    }

    onAddSuccess(){
        this.getFollowInfo()
    }

    onDeleteClick(id){
        axios({
            method: 'post',
            url: `/api/users/${this.props.currentUser._id}/unfollow`,
            data: {id: id}
        }).then((res)=>{
            this.getFollowInfo()
        })
    }

    render(){
        return (
            <div className="Friends">
                <SearchUser currentUser={this.props.currentUser} onAddSuccess={this.onAddSuccess.bind(this)} />
                
                <h3>Followers: {this.state.followers.length}</h3>
                <ul>
                    {this.state.followers.map((follower)=>{
                        return <li key={follower._id}>{follower.name}</li>
                    })}
                </ul>
                <h3>Following: {this.state.following.length}</h3>
                <ul>
                    {this.state.following.map((following)=>{
                        return <li key={following._id}>{following.name}<button onClick={this.onDeleteClick.bind(this, following._id)}>Remove</button></li>
                    })}
                </ul>
                
            </div>
        )
    }
}

export default Friends
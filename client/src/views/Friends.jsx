import React from 'react'
import axios from 'axios'

var sectionStyle = {
	backgroundImage: "url(" + require('../friend-background.jpeg') + ")",
	backgroundSize: '100% 100%',
	backgroundRepeat: 'no-repeat'
  };

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

    onDeleteClick(id){
        axios({
            method: 'post',
            url: `/api/users/${this.props.currentUser._id}/unfollow`,
            data: {id: id}
        }).then((res)=>{
            this.getFollowInfo()
            this.props.onDeleteSuccess()
        })
    }

    render(){
        return (
            <div className="Friends">
                <div className="friendsHeader" style={sectionStyle} >
                    <h1>Friends</h1>
                </div>
                <div className="row">
                    <div className="column friendsColumn">
                        <h3 className="friendsColumnHeader">Followers: {this.state.followers.length}</h3>
                        <ul>
                            {this.state.followers.map((follower)=>{
                                return <li key={follower._id}>{follower.name}</li>
                            })}
                        </ul>
                    </div>
                    <div className="column friendsColumn">
                        <h3 className="friendsColumnHeader">Following: {this.state.following.length}</h3>
                        <ul>
                            {this.state.following.map((following)=>{
                                return <li key={following._id}>{following.name}<button className="removeButton" onClick={this.onDeleteClick.bind(this, following._id)}>X</button></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends
import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Delete extends React.Component {

	componentDidMount(){
        axios({
            method: 'delete',
            url: `/api/users/${this.props.currentUser._id}`
        }).then((user)=>{
            if (user) {
                this.props.onDeleteSuccess()
            }   
        })
	}
	
	render() {
		return <Redirect to="/login" />
	}
}

export default Delete
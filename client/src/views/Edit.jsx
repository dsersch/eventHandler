import React from 'react'
import axios from 'axios'

class EditProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fields: {
                name: props.currentUser.name,
                email: props.currentUser.email,
                password: props.currentUser.password
            }
	    }
    }

	onInputChange(evt){
		this.setState({
			fields: {
				...this.state.fields, 
				[evt.target.name]: evt.target.value
			}
		})
    }

    onFormSubmit(evt){
        evt.preventDefault()
        axios({
            method: 'patch',
            url: `/api/users/${this.props.currentUser._id}`,
            data: this.state.fields
        }).then((user)=>{
            this.setState({ 
                fields: { 
                    name: '', 
                    email: '', 
                    password: '' 
               }
           })
           if (user) {
               console.log(user)
               this.props.onUpdateSuccess(user)
               this.props.history.push('/profile')
           }
        })
    }
    
    render(){
        const { name, email, password } = this.state.fields
        return (
            <div className="EditProfile">
                <h1>Update Profile</h1>
                <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Name" name="name" defaultValue={name} />
					<input type="text" placeholder="Email" name="email" defaultValue={email} />
					<input type="password" placeholder="Password" name="password" defaultValue={password} />
					<button>Update</button>
				</form>
            </div>
        )
    }
}

export default EditProfile
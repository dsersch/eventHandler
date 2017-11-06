import React from 'react'

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
					<button>Log In</button>
				</form>
            </div>
        )
    }
}

export default EditProfile
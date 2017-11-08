import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import clientAuth from './clientAuth.js'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Home from './views/Home'
import Show from './views/Show'
import EditProfile from './views/Edit'
import Delete from './views/Delete'
import CreateEvent from './views/CreateEvent'
import ShowEvent from './views/ShowEvent'
import EditEvent from './views/EditEvent'

class App extends React.Component {
	state = {
		currentUser: null
	}

	componentDidMount(){
		this.setState({
			currentUser: clientAuth.getCurrentUser()
		})
	}

	onLoginSuccess(user){
		this.setState({
			currentUser: clientAuth.getCurrentUser()
		})
	}

	logOut(){
		clientAuth.logOut()
		this.setState({
			currentUser: null
		})
	}
	
	render() {
		console.log(this.state)
		const currentUser = this.state.currentUser
		return (
			<div className='App'>
				<NavBar currentUser={currentUser}/>
				<Switch>
					<Route path="/login" render={(props)=>{
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)}/>
					}} />
					<Route path="/logout" render={(props)=>{
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />
					<Route path="/signup" render={(props)=>{
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />
					<Route path="/profile" render={(props)=>{
						return currentUser
						? <Show {...props} currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />
					<Route path="/edit" render={(props)=>{
						return currentUser
						? <EditProfile {...props} currentUser={currentUser} onUpdateSuccess={this.onLoginSuccess.bind(this)} />
						: <Redirect to="/login" />
					}} />
					<Route path="/delete" render={(props)=>{
						return currentUser
						? <Delete currentUser={currentUser} onDeleteSuccess={this.logOut.bind(this)} />
						: <Redirect to="/login" />
					}} />
					<Route path="/create-event" render={(props)=>{
						return currentUser
						? <CreateEvent {...props} currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />
					<Route path="/show-event/:id" render={(props)=>{
						return currentUser
						? <ShowEvent {...props} currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />
					<Route path="/edit-event/:id" component={EditEvent} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}

export default App
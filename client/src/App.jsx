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
					<Route path="/profile" render={()=>{
						return currentUser
						? <Show currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />
					<Route path="/edit" render={()=>{
						return currentUser
						? <EditProfile currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}

export default App
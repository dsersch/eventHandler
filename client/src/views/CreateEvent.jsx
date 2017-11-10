import React from 'react'
import axios from 'axios'

class CreateEvent extends React.Component{
    state = {
        fields: {
            title: '',
            body: '',
            location: '',
            time: '',
            date: ''
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
            method: 'post',
            url: `/api/users/${this.props.currentUser._id}/events`,
            data: this.state.fields
        }).then((event)=>{
            this.setState({
                fields: {
                    title: '',
                    body: '',
                    location: '',
                    time: '',
                    date: '' 
                }
            })
            if (event) {
                console.log(event)
                this.props.history.push('/profile')
            }
        })

    }
    
    render() {
		const {title, body, location, time, date } = this.state.fields
		return (
			<div className='CreateEvent' >
				<h1>Create Event</h1>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Title" name="title" value={title} />
					<input type="text" placeholder="Describe the event..." name="body" value={body} />
                    <input type="text" placeholder="Where is it going down?" name="location" value={location} />
                    <input type="time" name="time" value={time} />
                    <input type="date" name="date" value={date} />
					<button>Add Event</button>
				</form>
			</div>
		)
	}
}

export default CreateEvent
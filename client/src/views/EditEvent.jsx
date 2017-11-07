import React from 'react'
import axios from 'axios'

class EditEvent extends React.Component{
    state = {
        fields: {
            title: '',
            body: ''
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

    componentDidMount(){
        const { id } = this.props.match.params
        axios({
            method: 'get',
            url: `/api/events/${id}`
        }).then((res)=>{
            this.setState({
                fields: {
                    title: res.data.title,
                    body: res.data.body
                }
            })
        })
    }

    onFormSubmit(evt){
        evt.preventDefault()
        const { id } = this.props.match.params
        axios({
            method: 'patch',
            url: `/api/events/${id}`,
            data: this.state.fields
        }).then((res)=>{
            this.setState({
                fields: {
                    title: '',
                    body: ''
                }
            })
            if (res) {
                this.props.history.push(`/show-event/${id}`)
            }
        })
    }
    
    render() {
        const {title, body} = this.state.fields
		return (
			<div className='EditEvent'>
				<h1>Edit Event</h1>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Title" name="title" value={title} />
					<input type="text" placeholder="Describe the event..." name="body" value={body} />
					<button>Update Event</button>
				</form>
			</div>
		)
	}
}

export default EditEvent
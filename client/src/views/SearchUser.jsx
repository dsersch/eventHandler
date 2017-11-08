import React from 'react'
import axios from 'axios'

class SearchUser extends React.Component{
    state = {
        fields: {
            search: ''
        },
        results: []
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
            url: '/api/users/search',
            data: {search: this.state.fields.search}
        }).then((res)=>{
            this.setState({
                fields: {
                    search: ''
                },
                results: res.data.docs
            })
        })
    }

    onAddClick(id){
        axios({
            method: 'post',
            url: `/api/users/${this.props.currentUser._id}/follow`,
            data: {id: id}
        }).then((res)=>{
            this.setState({
                fields: {
                    search: ''
                },
                results: []
            })
            this.props.onAddSuccess()
        })
        
    }

    render(){
        return (
            <div className="SearchUser">
                <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" placeholder="Find friends..." name="search" value={this.state.fields.search}/>
                    <button>Find</button>
                </form>
                <ul>
                {this.state.results.map((result)=>{
                    return <li key={result._id}>{result.name}<button onClick={this.onAddClick.bind(this, result._id)}>+</button></li>
                })}
                </ul>
            </div>
        )
    }
}

export default SearchUser
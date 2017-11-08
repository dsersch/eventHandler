import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        console.log(this.state.fields.search)
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

    render(){
        return (
            <div className="SearchUser">
                <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" placeholder="Find friends..." name="search" value={this.state.field}/>
                    <button>Find</button>
                </form>
                <ul>
                {this.state.results.map((result)=>{
                    return <li key={result._id}>{result.name}<Link to="">+</Link></li>
                })}
                </ul>
            </div>
        )
    }
}

export default SearchUser
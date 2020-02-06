import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../styles/searchBox.css'

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    useQuery = () => {
        return new URLSearchParams(this.props.location.search)
    }

    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.search)
    }

    componentDidMount() {
        const query = this.useQuery()
        if (query.get('artist')) {
            this.setState({
                search: query.get('artist')
            })
        }
        this.searchInput.focus();
    }

    render() {
        const size = this.props.size ?? 'md'
        
        return (
            <div className="text-light w-100 sticky-top">
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-3 rounded-pill bg-light" size={size}>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="ml-4 p-0 text-muted"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            ref={(input) => { this.searchInput = input }} 
                            value={this.state.search}
                            onChange={this.handleSearch}
                            className="rounded-pill"
                        />
                    </InputGroup>
                </Form>
            </div>
        )
    }
}

export default withRouter(SearchBox)
import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

export default class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.search)
        this.setState({
            search: ''
        })
    }

    render() {
        return (
            <div className="text-light mt-5" >
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Search Artist</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            value={this.state.search}
                            onChange={this.handleSearch}
                        />
                    </InputGroup>
                </Form>
            </div>
        )
    }
}
import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import SearchBox from '../components/SearchBox'
import AlbumList from '../components/AlbumList'

export default class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  search = (data) => {
    this.setState({
      searchText: data
    })
  }

  render() {
    return (
      <Container>
        <SearchBox search={this.search}></SearchBox>
        {
          this.state.searchText
            ? <AlbumList artist={this.state.searchText}></AlbumList>
            : <h1 className="text-center font-weight-bold text-capitalize">Nothing to find</h1>
        }
      </Container>
    );
  }
}

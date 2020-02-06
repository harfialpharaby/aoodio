import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap'
import SearchBox from '../components/SearchBox'
import AlbumList from '../components/AlbumList'
import {withRouter} from 'react-router-dom'
import Logo from '../components/Logo'

class SearchPage extends Component {
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
    
    this.props.history.push({
      pathname: '/search',
      search: `?artist=${data}`
    })
  }

  useQuery = () => {
    return new URLSearchParams(this.props.location.search)
  }

  componentDidMount() {
    const query = this.useQuery()
    const artist = query.get('artist')
    this.search(artist)
  }

  render() {
    return (
      <Container fluid className="mt-5">
        <Row className="text-right justify-content-center">
          <Col md={8}>
            <Logo fontSize="35px" withLink={true}></Logo>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <SearchBox search={this.search} size="lg" showPrepend={false} roundedPill="rounded-pill"></SearchBox>
            {
              !this.state.searchText
                ? <h1 className="text-center font-weight-light text-capitalize">Search your favorite artist's albums</h1>
                : <AlbumList artist={this.state.searchText}></AlbumList>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SearchPage)
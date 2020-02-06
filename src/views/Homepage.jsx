import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap'
import SearchBox from '../components/SearchBox'
import {withRouter} from 'react-router-dom'
import Logo from '../components/Logo'
import '../styles/homepage.css'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: null
    }
  }

  search = (data) => {
    this.setState({
      searchText: data
    })
    this.props.history.push(`/search?artist=${data}`);
  }

  render() {
    return (
      <Container className="d-flex align-items-center">
        <Row className="w-100 justify-content-center">
          <Col className="text-center" md={6}>
            <Row>
              <Col>
                <p className="title">
                  <Logo fontSize='100px'></Logo>
                  <span className="dictionary font-weight-light text-muted">
                    ( A./u/.di.o )
                  </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <SearchBox search={this.search} size="lg"></SearchBox>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* {
          !this.state.searchText
            ? <h1 className="text-center font-weight-light text-capitalize">Search your favorite artist's albums</h1>
            : <AlbumList artist={this.state.searchText}></AlbumList>
        } */}
      </Container>
    );
  }
}

export default withRouter(Homepage)
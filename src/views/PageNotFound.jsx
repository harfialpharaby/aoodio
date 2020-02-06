import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../components/Logo";
import notFound from '../undraw_not_found_60pq.svg'

class PageNotFound extends Component {
    render() {
        const pathname = this.props.location.pathname
        
        return (
            <Container>
                <Row>
                    <Col className="mt-5">
                        <Logo fontSize='50px' withLink={true}></Logo>
                    </Col>
                    <Col className="mt-5">
                        <img src={notFound} alt="not found logo" style={{maxHeight: '15rem', opacity: '0.9'}}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="text-capitalize font-weight-light">
                            <span className="font-weight-bold">404.</span> page not found.
                        </h5>
                        <h5 className="font-weight-light mt-5" style={{fontSize: '15px'}}>
                            The requested URL {pathname} was not found on this server.
                        </h5>
                        <h6 className="font-weight-light text-muted" style={{fontSize: '15px'}}>
                            That's all we know.
                        </h6>
                    </Col>                    
                </Row>
            </Container>
        )
    }
}

export default withRouter(PageNotFound)
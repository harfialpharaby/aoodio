import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import useFetchAlbum from '../hooks/useFetchAlbum'
import AlbumCard from './AlbumCard'

export default function AlbumList(props) {
    const {isLoading, err, albums} = useFetchAlbum(props.artist)

    return (
        <div>
            {
                isLoading
                    ? (
                        <>
                            <Row>
                                <Col className="text-center mt-5"><Spinner animation="border" variant="primary"/></Col>
                            </Row>
                            <Row>
                                <Col className="text-center mt-5">
                                    <h2 style={{letterSpacing: '.1em'}} className="font-weight-light">Searching....</h2>
                                </Col>
                            </Row>
                        </>
                    )
                    : typeof albums[0] === 'string' || err
                    ? (
                        <Row>
                            <Col className="text-center mt-5">
                                <h1 className="font-weight-light text-capitalize">
                                    No data found for artist
                                    <span className="font-weight-bold text-uppercase"> {props.artist}</span>
                                </h1>
                                <h3 className="font-weight-light text-capitalize">
                                    Try input artist fullname or find different artist
                                </h3>
                            </Col>
                        </Row>
                    )
                    : (
                        <>
                            <Row>
                                <Col>
                    <p className="text-capitalize font-weight-light">about <span className="font-weight-normal">{albums.length}</span> results found for <span className="font-weight-normal">{props.artist}</span></p>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    albums.map(album => {
                                        return (
                                            <Col key={album.id} md={3}>
                                                <AlbumCard album={album}></AlbumCard>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </>
                    )
            }
        </div>
    );
}
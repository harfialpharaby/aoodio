import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

export default function AlbumList(props) {
    const [albums, setAlbums] = useState([]);
    
    useEffect(() => {
        fetch(`http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=${props.artist}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                setAlbums(
                    data.album.map(album => {
                        return {
                            id: album.idAlbum,
                            thumbnail: album.strAlbumThumb,
                            albumName: album.strAlbum,
                            artistName: album.strArtist,
                            releaseDate: album.intYearReleased,
                            genre: album.strGenre,
                            label: album.strLabel,
                            description: album.strDescriptionEN,
                            loved: album.intLoved,
                            score: album.intScore,
                            voted: album.intScoreVotes
                        }
                    })
                )
            }).catch((err) => {
                console.log(err);
            });
    }, [props.artist])

    return (
        <div>
            <Row>
                <Col>
                    <p className="text-center">
                        Searching albums for artist <strong className="text-uppercase">{props.artist}</strong>
                    </p>
                </Col>
            </Row>
            {
                !albums.length
                    ? (
                        <Row>
                            <Col className="text-center"><Spinner animation="border" variant="success"/></Col>
                        </Row>
                    )
                    : (
                        <>
                            <Row>
                                <Col>
                                    <p>data found (<span className="text-success font-weight-bold">{albums.length}</span>) :</p>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    albums.map(album => {
                                        return (
                                            <Col key={album.id}>
                                                <Card className="shadow-sm mb-3" style={{ width: '18rem' }}>
                                                    <Card.Img src={album.thumbnail} variant="top" style={{ width: '18rem' }}/>
                                                    <Card.Body>
                                                        <h2>{album.albumName}</h2>
                                                        <p>{album.genre}</p>
                                                        <p>{album.label}</p>
                                                        <p>{album.albumName}</p>
                                                    </Card.Body>
                                                </Card>
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
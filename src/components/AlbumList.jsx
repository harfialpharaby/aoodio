import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

export default function AlbumList(props) {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setLoading] = useState(false)    

    const generateStar = (score) => {
        let stars = []
        while (score > 0) {
            if (score < 1) {
                stars.push(<FontAwesomeIcon icon={faStarHalf} />)
            } else {
                stars.push(<FontAwesomeIcon icon={faStar} />)
            }
            score--
        }

        return stars
    }
    
    useEffect(() => {
        setLoading(true)
        fetch(`http://theaudiodb.com/api/v1/json/1/searchalbum.php?s=${props.artist}`)
            .then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                
                if (!data.album) {
                    setAlbums(['Not Found'])
                } else {
                    setAlbums(
                        data.album.map(album => {
                            return {
                                id: album.idAlbum,
                                thumbnail: album.strAlbumThumb || 'https://bandungumroh.com/sie/assets/no_image.png',
                                albumName: album.strAlbum,
                                artistName: album.strArtist,
                                releaseDate: album.intYearReleased,
                                genre: album.strGenre,
                                label: album.strLabel,
                                description: album.strDescriptionEN,
                                loved: album.intLoved || 0,
                                score: album.intScore || 'No Rate',
                                stars: generateStar(album.intScore),
                                voted: album.intScoreVotes || 0
                            }
                        })
                    )
                }
                setLoading(false)
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
                isLoading
                    ? (
                        <Row>
                            <Col className="text-center"><Spinner animation="border" variant="success"/></Col>
                        </Row>
                    )
                    : typeof albums[0] === 'string'
                    ? (
                        <Row>
                            <Col className="text-center">
                                <h1 className="font-weight-light text-capitalize">
                                    No data found for artist
                                    <span className="font-weight-bold text-uppercase"> {props.artist}</span>
                                </h1>
                                <h3 className="font-weight-light text-capitalize">
                                    Try to find different artist or input artist fullname
                                </h3>
                            </Col>
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
                                            <Col key={album.id} md={3}>
                                                <Card className="shadow-sm mb-3" style={{ width: '15rem' }}>
                                                    <Card.Img src={album.thumbnail} variant="top" style={{ width: '15rem' }}/>
                                                    <Card.Body className="p-0">
                                                        <h2 className="px-3">{album.albumName}</h2>
                                                        <div className="font-weight-light px-3" style={{fontSize: '12px'}}>{album.genre}</div>
                                                        <div className="px-3">{album.label}</div>
                                                        <div className="d-flex justify-content-between mt-4 mb-3">
                                                            <span>
                                                                {
                                                                    album.stars.length
                                                                        ? <span className="mr-1 text-warning">{album.stars}</span>
                                                                        : null
                                                                }
                                                                <span className="font-weight-light" style={{fontSize: '12px'}}>
                                                                    {album.score}
                                                                </span>
                                                            </span>
                                                            <span>
                                                                <FontAwesomeIcon icon={faHeart} className="mr-1 text-danger"/>
                                                                <span className="font-weight-light" style={{fontSize: '12px'}}>
                                                                    {album.loved}
                                                                </span>
                                                            </span>
                                                        </div>
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
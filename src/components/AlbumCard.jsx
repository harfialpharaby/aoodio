import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import '../styles/albumCard.css'
import {Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

export default function AlbumCard(props) {
    const albumData = props.album;
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Link to={`/album/${albumData.artistId}/${albumData.id}`} className="text-decoration-none">
            <Card className="shadow-sm mb-3 album-card" style={{ width: '15rem' }}>
                <div className="loadImage" style={{display: isLoading ? "block" : "none"}}>
                    <div className="mt-5">
                        <Spinner animation="grow" variant="primary"/>
                        <Spinner animation="grow" variant="danger"/>
                        <Spinner animation="grow" variant="warning"/>
                    </div>
                    <p className="text-dark text-decoration-none font-weight-light">
                        Loading Image...
                    </p>
                </div>
                <Card.Img
                    style={{display: isLoading ? "none" : "block", width: '14.9rem'}}
                    src={albumData.thumbnail}
                    variant="top"
                    onLoad={() => setIsLoading(false)}
                />
                <div className="middle">
                    <h2 className="px-3">{albumData.albumName}</h2>
                    <div className="font-weight-light px-3" style={{fontSize: '12px'}}>{albumData.genre}</div>
                    <div className="px-3">{albumData.label}</div>
                </div>
                <Card.Body className="p-0">
                    <p className="text-truncate text-dark font-weight-bold mx-2">{albumData.albumName}</p>
                    <div className="d-flex justify-content-between mt-4 mb-3">
                        <span>
                            <span className="mr-1 text-warning">
                                {
                                    albumData.stars.map(star => {
                                        if (star < 1) {
                                            return <FontAwesomeIcon icon={faStarHalf} key={star}/>
                                        } else {
                                            return <FontAwesomeIcon icon={faStar} key={star}/>
                                        }
                                    })
                                }
                            </span>
                            <span className="font-weight-light" style={{fontSize: '12px'}}>
                                {albumData.score}
                            </span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faHeart} className="mr-1 text-danger"/>
                            <span className="font-weight-light" style={{fontSize: '12px'}}>
                                {albumData.loved}
                            </span>
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}
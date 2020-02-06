import React, { Component } from "react";
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Logo from '../components/Logo'
import { connect } from 'react-redux'
import { fetchTrack, fetchArtist } from '../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import '../styles/albumDetail.css'

class AlbumDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoadArtistImage: true,
        isLoadTrackImage: true
    }
  }

  useQuery = (link) => {
    return new URLSearchParams(link) || null
  }

  componentDidMount() {
    this.props.dispatch(fetchArtist(this.props.match.params.artistId))

    this.props.dispatch(fetchTrack({
      album: this.props.match.params.albumId, 
      artist: this.props.match.params.artistId
    }))
  }

  render() {
    const trackData = this.props.track
    const artistData = this.props.artist

    return (
      <Container fluid className="outer-container">
            <Row className="justify-content-center">
              <Col className="mt-5 mb-3 d-flex align-items-end" md={3}>
                <button onClick={() => this.props.history.goBack()} className="btn btn-link text-decoration-none" style={{fontSize: '20px'}}>
                  <FontAwesomeIcon icon={faChevronLeft}/> Back
                </button>
              </Col>
              <Col className="text-right mt-5 mb-3" md={3}>
                <Logo fontSize="50px" withLink={true}></Logo>
              </Col>
            </Row>
            <Row className="justify-content-center mb-1">
              <Col className="shadow-sm album-detail p-5" md={6}>
                {
                  artistData.isLoading
                    ? (
                      <div className="text-center my-5">
                        <Spinner animation="grow" variant="primary"/>
                        <Spinner animation="grow" variant="danger"/>
                        <Spinner animation="grow" variant="warning"/>
                        <p>Loading artist data...</p>
                      </div>
                    )
                    : artistData.artists.length && typeof artistData.artists[0] === 'string'
                    ? <h3>Oops... Artist Data Not Found</h3>
                    : typeof artistData.artists[0] === 'object'
                    ? (
                      <>
                        <h1 className="text-center mb-4 font-weight-light artist-name">
                          {artistData.artists[0].artistName}
                        </h1>
                        <div className="text-center my-5" style={{display: this.state.isLoadArtistImage ? "block" : "none"}}>
                          <Spinner animation="grow" variant="primary"/>
                          <p className="text-dark text-decoration-none font-weight-light">
                            Loading Image...
                          </p>
                        </div>
                        <div className="text-center" style={{display: this.state.isLoadArtistImage ? "none" : "block"}}>
                          <a href={`http://${artistData.artists[0].website}`} target="_blank" rel="noopener noreferrer">
                            <img
                              src={artistData.artists[0].clearArt || (artistData.artists[0].thumbnail || artistData.artists[0].logo)}
                              alt={artistData.artists[0].artistName}
                              className="img-fluid"
                              onLoad={() => this.setState({isLoadArtistImage: false})}
                            />
                          </a>
                        </div>
                        <Row className="text-muted text-center mt-5" style={{fontSize: '15px', borderBottom: '.4px solid lightgray'}}>
                          <Col>
                            <p><span className="font-weight-light">Label:</span> {artistData.artists[0].label || 'Unknown'}</p>
                          </Col>
                          <Col>
                            <p><span className="font-weight-light">Style:</span> {artistData.artists[0].style || 'Unknown'}</p>
                          </Col>
                          <Col>
                            <p><span className="font-weight-light">Genre:</span> {artistData.artists[0].genre || 'Unknown'}</p>
                          </Col>
                          <Col>
                            <p><span className="font-weight-light">Mood:</span> {artistData.artists[0].mood || 'Unknown'}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div 
                              className="subhead mt-3"
                              dangerouslySetInnerHTML={{
                                __html: artistData.artists[0].biography
                              }}>
                            </div>
                          </Col>
                        </Row>
                      </>
                    )
                    : null
                }
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="pt-4 m-0" md={6}>
                <h1 className="m-0">Tracks Data</h1>
                <p style={{fontSize: '10px', letterSpacing: '.6px'}} className="text-muted">
                  Click track image to play video on youtube
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="shadow-sm album-detail p-5 mb-5" md={6}>
                {
                  trackData.isLoading
                    ? (
                      <div className="text-center my-5">
                        <Spinner animation="grow" variant="primary"/>
                        <Spinner animation="grow" variant="danger"/>
                        <Spinner animation="grow" variant="warning"/>
                        <p>Loading track data...</p>
                      </div>
                    )
                    : trackData.err || (trackData.tracks.length && typeof trackData.tracks[0] === 'string')
                    ? <h3>Oops... Track Data Not Found</h3>
                    : (
                      <>
                        {
                          trackData.tracks.map(track => {
                            return (
                              <Row key={track.id} className="mb-4" style={{borderBottom: '.3px solid lightgray'}}>
                                <Col>
                                  <span className="text-center" style={{display: this.state.isLoadTrackImage ? "block" : "none", height: '100px'}}>
                                    <Spinner animation="grow" variant="primary"/>
                                  </span>
                                  <span className="text-center" style={{display: this.state.isLoadTrackImage ? "none" : "block"}}>
                                    <a 
                                      href={track.video || null}
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      title={track.video ? "Play Music Video" : "Video Unavailable"}
                                    >
                                      <img
                                        src={track.thumbnail}
                                        alt={track.trackName}
                                        className="img-fluid mb-2"
                                        style={{height: '100px'}}
                                        onLoad={() => this.setState({isLoadTrackImage: false})}
                                      />
                                    </a>
                                  </span>
                                </Col>
                                <Col className="align-self-center">
                                  <a 
                                    href={track.video || null}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    title={track.video ? "Play Music Video" : "Video Unavailable"}
                                    className="text-decoration-none"
                                  >
                                    <h6 className="artist-name">
                                      {track.trackName}
                                    </h6>
                                  </a>
                                </Col>
                                <Col md={2} className="font-weight-light align-self-center text-center" style={{fontSize: '15px'}}>
                                  <FontAwesomeIcon icon={faStar} className="text-warning"/> {track.score}
                                </Col>
                                <Col md={2} className="font-weight-light align-self-center text-center" style={{fontSize: '15px'}}>
                                  <FontAwesomeIcon icon={faHeart}  className="text-danger"/> {track.loved}
                                </Col>
                              </Row>
                            )
                          })
                        }
                      </>
                    )
                  }
              </Col>
            </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default withRouter(connect(mapStateToProps)(AlbumDetail));
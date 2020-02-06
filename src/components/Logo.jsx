import React from "react";
import {Link} from 'react-router-dom'

export default function Logo(props) {
    const fontSize = props.fontSize
    const withLink = props.withLink ?? false

    if (withLink) {
        return (
            <Link to="/" className="text-decoration-none font-weight-light">
                <span style={{fontSize}}>
                    <span className="text-info">A</span>
                    <span className="text-danger">o</span>
                    <span className="text-warning">o</span>
                    <span className="text-primary">d</span>
                    <span className="text-success">i</span>
                    <span className="text-danger">o</span>
                </span>
            </Link>
        )
    } else {
        return (
            <span style={{fontSize}} className="font-weight-light">
                <span className="text-info">A</span>
                <span className="text-danger">o</span>
                <span className="text-warning">o</span>
                <span className="text-primary">d</span>
                <span className="text-success">i</span>
                <span className="text-danger">o</span>
            </span>
        )
    }
}
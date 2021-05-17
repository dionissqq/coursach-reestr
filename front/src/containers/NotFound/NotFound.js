import React from 'react';
import { Link } from 'react-router-dom';

import './notFound.css';

export default function NotFound() {
    document.body.className = "background";
    document.title = "Not Found";
    return (
        <div id="notfound_container" className="center">
            <p id="notfound_label">
                The page you're looking<br />for can't be found
            </p>
            <div id="notfound_home_button_outter">
                <Link to = "/" className = {"no_link"} >
                    <div className="button light_shadow white_button">
                        Home
                    </div>
                </Link>
            </div>
        </div>
    );
}
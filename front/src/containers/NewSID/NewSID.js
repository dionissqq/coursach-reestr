import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { getCurrentUser } from '../../utils/auth';
import Messages from '../../utils/messages';

import './newSID.css';

export default function NotFound(props) {
    document.body.className = "background";
    document.title = "Новий запис";
    
    const [warning, setWarning] = useState(Messages.Empty);
    const sessionUser = getCurrentUser();

    if (!sessionUser && warning === Messages.Empty)
        setWarning(Messages.Unauthorized(props.location.pathname));
    
    return (
        (warning && warning !== Messages.Empty) ?
            warning
        :  
        <div className="notfound_container center">
            <div className="notfound_home_button_outter">
                <Link to = "/media/new" className = {"no_link"} >
                    <div className="button light_shadow white_button">
                        Внести запис про ЗМІ
                    </div>
                </Link>
            </div>
            <div className="notfound_home_button_outter">
                <Link to = "/agency/new" className = {"no_link"} >
                    <div className="button light_shadow white_button">
                        Внести запис про інформаційне агенство
                    </div>
                </Link>
            </div>
        </div>
    );
}
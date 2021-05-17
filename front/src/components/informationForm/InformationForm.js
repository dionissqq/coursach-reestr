import React from 'react';

import './informationForm.css';

export default function InformationForm ({ message , onClick}) {
    
    return (
        <div id="form_background">
            <div className="center card_view shadow" id="conf_form">
                <div>
                    <p id="conf_text" >
                        { message }
                    </p>
                </div>
                <div id ="infform_buttonBox">
                    <div className="button conf_button" onClick={ onClick }>
                        OK
                    </div>
                </div>
            </div>
        </div>
    )
}
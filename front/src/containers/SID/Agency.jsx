import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Server from '../../utils/server';
import DefaultMessages from '../../utils/messages';
import Agency from '../../utils/models/agency';
import ConfirmationForm from '../../components/confirmationForm/ConfirmationForm';
import { getCurrentUser } from '../../utils/auth';
import InformationForm from '../../components/informationForm/InformationForm';

import './sid.css'

const Messages = Object.assign ({}, DefaultMessages)

export default function AgencyOptions(props) {
    document.body.className = "background";
    document.title = "Агенство";

    const id = props.match.params.id;

    const [warning, setWarning] = useState(Messages.Empty);
    const [confirm, setConfirm] = useState(false);
    const [informationMessage, setInformationMessage] = useState(Messages.Empty);

    const sessionUser = getCurrentUser();

    if (!sessionUser && warning === Messages.Empty)
        setWarning(Messages.Unauthorized(props.location.pathname));

    function deleteEntity() {
        setConfirm(true);
    }

    let deleting = false;

    const confirmationForm = {
        message : "Ви впевнені?",
        onConfirm : () => {
            if (!deleting)
                deleting = true;
            else
                return;
            Agency.delete(id)
                .then((result) => {
                    const error = result.error;
                    if (error) {
                        switch (error) {
                            case Server.ErrorTypes.Unauthorized:
                                setWarning(Messages.Unauthorized);
                                break;
    
                            case Server.ErrorTypes.ConnectionError:
                                alert(Messages.ConnectionError)
                                setWarning(Messages.ConnecionError);
                                break;
    
                            case Server.ErrorTypes.NotFound:
                                setWarning(Messages.NotFound);
                                break;
    
                            default:
                                setWarning(Messages.ServerError);
                        }
                        setConfirm(false);
                        return;
                    }
                    setInformationMessage("Сутність видалено!")
                })
        },
        onDecline : () => {
            setConfirm(false);
        }
    }

    const informationForm = {
        message : informationMessage,
        onClick : () => setWarning(Messages.Redirect("/"))
    };

    return (
        <React.Fragment>
            {
                warning && warning !== Messages.Empty ?
                    <div className="center">
                        { warning }
                    </div>
                :
                <div className="center shadow card_view sid_form">
                    <p className="emphasized" style={{textAlign: 'center', fontSize: "1.6rem"}}>
                        Реєстраційний номер агенства: { id }
                    </p>
                    <div className="sid_button_outter">
                        <Link to={location => `${location.pathname}/certificate`} className = {"no_link"} >
                            <div className="button light_shadow white_button">
                                Отримати сертифікат про реєстрацію агенства
                            </div>
                        </Link>
                    </div>
                    <div className="sid_button_outter">
                        <Link to={location => `${location.pathname}/edit`} className = {"no_link"} >
                            <div className="button light_shadow white_button">
                                Змінити дані про агенство
                            </div>
                        </Link>
                    </div>
                    <div className="sid_button_outter">
                        <div className="button light_shadow white_button sid_button_red" onClick={ deleteEntity }>
                            Видалити сутність
                        </div>
                    </div>
                </div>
            }
            {
                confirm ?
                    <ConfirmationForm {...confirmationForm}/>
                : ''
            }
            {
                informationMessage !== Messages.Empty ?
                    <InformationForm {...informationForm}/>
                : ''
            }
        </React.Fragment>
    );
}
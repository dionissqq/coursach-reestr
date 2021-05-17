import React from 'react';
import { Link } from 'react-router-dom';

import './nav.css';
import  { getCurrentUser, logout } from '../../utils/auth';
import Server from '../../utils/server';

export default function Nav () {
    const user = getCurrentUser();

    const cinema = {
        loadingStatus : Server.DataLoadingStatus.Loaded,
        data : {
            name: "Реєстр",
        }
    }

    let menuItemsList = [];
    if (user)
        menuItemsList.push (
            {
                label : "Створити СІД",
                link : "/sid/new"
            },
            {
                content : (
                    <span onClick={ logout } className={'menu_block'}>
                        <li>{ "Вихід" }</li>
                    </span>
                )
            }
        );
    else
        menuItemsList.push ({
            label : "Вхід",
            link : "/login"
        });
    
    return (<nav className="shadow">
                <React.Fragment>
                    <Link to="/" className={'no_link'}>
                        <div id ="main_label">
                            { cinema.data.name }
                        </div>
                    </Link>
                    <ul id= "nav_menu">
                        {
                            menuItemsList.map((item, ind) => {
                                return (item.link ? <Link key={ind} to={item.link} className={'no_link  menu_block'}>
                                    <li>{ item.label }</li>
                                </Link>
                                : item.content )
                            })
                        }
                    </ul>
                </React.Fragment>
            </nav>
        )
}
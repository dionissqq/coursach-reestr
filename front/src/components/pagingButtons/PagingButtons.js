import React from 'react';

import './pagingButtons.css';

export default function PagingButtons({pagesAmount, currentPage, cb }) {
    let pages = [];
    for (let i = 0 ; i < pagesAmount; i++)
        pages.push(i + 1);
    return (
        <div id="pagingButtonsContainer">
            { 
                pagesAmount > 1
                ?
                    <React.Fragment>
                        <div id="leftPageButton" className="arrow_button" onClick={() => cb(currentPage - 1) } style={{visibility: (currentPage === 1) ? 'hidden' : 'visible'}}>
                            {"<"}
                        </div>
                        Page&nbsp;
                        <select id="pageSelector" onChange={event => cb(Number(event.target.options[event.target.selectedIndex].value)) } defaultValue={currentPage}>
                            <option disabled>Pages</option>
                            {
                                pages.map((_el, index) => {
                                    return <option id={ "page" + (index + 1) } key={index} value={ index + 1 }>{ index + 1 }</option>
                                })
                            }
                        </select>
                        &nbsp;of { pagesAmount }
                        <div id="rightPageButton" className="arrow_button" onClick={() => cb(currentPage + 1) } style={{visibility: (currentPage === pagesAmount) ? 'hidden' : 'visible'}}>
                            {">"}
                        </div>
                    </React.Fragment>
                : ''
            }
        </div>
    )
}
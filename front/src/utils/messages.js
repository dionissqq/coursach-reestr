import React from 'react';

import { Redirect } from 'react-router-dom';

const Messages = {
    Empty : "",
    ServerError : "Помилка сервера",
    ConnectionError : "Помилка з'єднання із сервером",
    NotFound : "Record with such id doesn't exist",
    Loading : "Завантаження...",
    Forbidden : "У Вас недостатньо прав для доступу до цієї сторінки",
    Unauthorized : (pathname) => <Redirect to= { "/login?info=mustLogin&redirect=" + pathname } />,
    Redirect : (location) => <Redirect to= { location } />,
    Saved : "Збережено!",
    QueryWithNoResults : "Nothing was found. Try another search term.",
    NothingToShow : "There's nothing to see so far",
    Successfully : "Successfully"
}

export default Messages;
import 'whatwg-fetch';

const withQuery = require('with-query').default;

const API = {
    CLIENT_ID: '57a97a2f8a68d2c084cfcba975612cb5',
    URL: 'http://api.openweathermap.org/data/2.5/'
};

function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function forecast(query) {
    const newQ = {
        appid: API.CLIENT_ID,
        units: 'metric',
        ...query
    };
    return fetch(withQuery(`${API.URL}/forecast`, newQ))
        .then(checkStatus)
        .then(parseJSON);
}
export const httpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const http = (
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: object
) =>
    fetch(url, {
        method: method || httpMethods.GET,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    }).then(response => response.json());

export default http;

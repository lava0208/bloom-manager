import { apiUrl } from 'config';

export const plantingService = {
    create,
    getById
};

const baseUrl = `${apiUrl}/plantings`;

async function create(params) {
    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return response.json();
}

async function getById(id) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}
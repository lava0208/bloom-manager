import { apiUrl } from 'config';

export const plantService = {
    create
};

const baseUrl = `${apiUrl}/plants`;

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
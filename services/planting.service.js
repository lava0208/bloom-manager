import { apiUrl } from 'config';

export const plantingService = {
    getAll,
    create,
    getById,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/plantings`;

async function getAll() {
    const response = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

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

async function update(id, params) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return response.json();
}

async function _delete(id) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "Delete",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}
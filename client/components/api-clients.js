import queryString from 'querystring';

const create = async (client) => {
    try {
        let response = await fetch('/api/clients/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })

        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const listClients = async (signal) => {
    try {
        let response = await fetch('/api/clients/', {
            method: 'GET',
            signal: signal
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listClient = async (params, signal) => {
    const query = queryString.stringify(params);

    try {
        let response = await fetch('/api/client?' +query, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    create,
    listClients,
    listClient
}
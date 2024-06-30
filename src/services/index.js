const services = {
    getMaxPuja: async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    addPuja: async (url, body) => {
        const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        return data;
    }
};

export default services;
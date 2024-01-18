const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { // нужен для работы с JSON
            'Content-type': 'application/json' // нужен для работы с JSON
        }, // нужен для работы с JSON
        // body: formData
        body: data
    });

    return await res.json();
};


async function getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export { postData };
export { getResource };
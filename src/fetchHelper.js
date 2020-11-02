export const getData = async (urls, throwErrorIfOneFails) => {
    if (!urls) {
        throw "URL List is required";
    }
    const responses = [];
    const errors = [];
    const dataUrls = [];

    if (Array.isArray(urls)) {
        dataUrls.push(...urls);
    } else {
        dataUrls.push(urls);
    }

    for (const url of dataUrls) {
        try {
            const response = await fetchData(url);
            responses.push(response);
        } catch (error) {
            if (throwErrorIfOneFails) {
                throw error;
            } else {
                errors.push({ url, error });
            }
        }
    }
    return { data: responses, errors };
};

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw res;
        }
        const res = await response.json();
        return res;
    } catch (error) {
        throw error;
    }
};

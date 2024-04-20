export const HOST_URL = 'https://flask.mockai.zifengallen.top:5000';
// export const HOST_URL = 'https://alert-cheetah-true.ngrok-free.app';
export const WS_URL = 'wss://flask.mockai.zifengallen.top:8888';
export const getTimeStamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS, so +1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}

interface Response {
    status: boolean,
    data: any
};

export async function fetchData<T>(url: string,
                                   method: string = 'GET',
                                   headers: HeadersInit = {'Content-Type': 'application/json'},
                                   body?: any): Promise<T> {
    try {
        const options = {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined
        }
        const response = await fetch(url,options);

        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }

        const data: Response = await response.json();

        if (!data.status) {
            throw new Error(data.data);
        }
        return data.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
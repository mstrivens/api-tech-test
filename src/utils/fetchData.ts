import axios, {AxiosResponse, AxiosError} from 'axios';

export interface ApiResponse {
    [key: string]: Array<any> | any;
}

export const fetchData = async (url: string): Promise<ApiResponse> => {
    try {
        const headers = {
            'accept': 'application/json'
        }
        const response: AxiosResponse<ApiResponse> = await axios.get(url, {headers: headers})
        const data: ApiResponse = response.data
        return data
    } catch (e: AxiosError | unknown) {
        if (e instanceof AxiosError) {
            throw e.response
        }
        throw e;
    }
}
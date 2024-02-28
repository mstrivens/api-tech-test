import axios, {AxiosResponse, AxiosError} from 'axios';

export interface ApiResponse {
    [key: string]: Array<any>;
  }
export const fetchData = async (url: string): Promise<ApiResponse> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(url, {headers: {'accept': 'application/json'}})
        const data: ApiResponse = response.data
        return data
    } catch (e: AxiosError | unknown) {
        if (e instanceof AxiosError) {
            console.log(e.response)
        }
        console.log(e)
        throw e;
    }
}
import axios from 'axios'
import { DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl)
    return data
}

const create = async (obj: DiaryEntry) => {
    let err = null;
    try {
        const { data } = await axios.post<DiaryEntry>(baseUrl, obj)
        return {data, err};
        
    } catch (error) {
        if(axios.isAxiosError(error))
        {
            err = error.response?.data
        }
        return {data: null, err};
    }

}

export default { getAll, create }
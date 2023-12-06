import axios from 'axios'
import { DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl)
    return data
}

const create = async (obj: DiaryEntry) => {
    const { data } = await axios.post<DiaryEntry>(baseUrl, obj)
    return data
}

export default { getAll, create }
import axios from 'axios'
import { DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl)
    return data
}

export default { getAll }
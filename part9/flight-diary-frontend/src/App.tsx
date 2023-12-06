import { SyntheticEvent, useEffect, useState } from 'react'
import diaryService from './services/diaries'
import { ContentProps, DiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data)
    })
  }, [])

  const DiaryContent = (props: ContentProps) => {
    return (
      props.diaryList.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>visiblity: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
            <br></br>
          </div>
        )
      })
    )
  }

  const AddDiary = () => {
    const [date, setDate] = useState('')
    const [visibility, setVisiblity] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')
    const handleAddDiary = async (event: SyntheticEvent) => {
      event.preventDefault()
      const result = await diaryService.create({
        date, visibility, weather, comment, id: Math.max(...diaries.map(diary => diary.id)) + 1
      })
      setDiaries(diaries.concat(result))
      setDate('')
      setVisiblity('')
      setWeather('')
      setComment('')
    }
    return (
      <div>
        <h2>Add new entry</h2>
        <form onSubmit={handleAddDiary}>
          <div>date <input value={date} onChange={({ target }) => setDate(target.value)} /></div>
          <div>visibility <input value={visibility} onChange={({ target }) => setVisiblity(target.value)} /></div>
          <div>weather <input value={weather} onChange={({ target }) => setWeather(target.value)} /></div>
          <div>comment <input value={comment} onChange={({ target }) => setComment(target.value)} /></div>
          <div><button type='submit'>add</button></div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <AddDiary />
      <h2>Diary entries</h2>
      <DiaryContent diaryList={diaries} />
    </div>
  )
}

export default App

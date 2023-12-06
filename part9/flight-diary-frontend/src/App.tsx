import { useEffect, useState } from 'react'
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

  return (
    <div>
      <h2>Diary entries</h2>
      <DiaryContent diaryList={diaries} />
    </div>
  )
}

export default App

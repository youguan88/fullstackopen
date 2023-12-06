import { SyntheticEvent, useEffect, useState } from 'react'
import diaryService from './services/diaries'
import { ContentProps, DiaryEntry, Visibility, Weather } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data)
    })
  }, [])

  const DiaryContent = (props: ContentProps) => {
    return (
      props.diaryList.sort((a, b) => { return Date.parse(a.date) - Date.parse(b.date) }).map((diary) => {
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
    const [visibility, setVisiblity] = useState<Visibility | undefined>(undefined)
    const [weather, setWeather] = useState<Weather | undefined>(undefined)
    const [comment, setComment] = useState('')
    const handleAddDiary = async (event: SyntheticEvent) => {
      event.preventDefault()
      const { data, err } = await diaryService.create({
        date, visibility, weather, comment, id: Math.max(...diaries.map(diary => diary.id)) + 1
      })
      if (data) {
        setDiaries(diaries.concat(data))
        setDate('')
        setVisiblity(undefined)
        setWeather(undefined)
        setComment('')
      }
      else {
        setNotification(err)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }

    }
    const Notification = () => {
      const style: React.CSSProperties = { color: 'red', paddingBottom: '1em', fontWeight: 'bold' }
      if (!notification) {
        return null
      }
      return (
        <div style={style}>{notification}</div>
      )
    }
    const WeatherOptions = Object.values(Weather);
    const VisbilityOptions = Object.values(Visibility)
    return (
      <div>
        <h2>Add new entry</h2>
        <Notification />
        <form onSubmit={handleAddDiary}>
          <div>date <input type="date" value={date} onChange={({ target }) => setDate(target.value)} /></div>
          <fieldset>
            <legend>visibility: </legend>
            {VisbilityOptions.map(option => {
              return (
                <div key={option}>
                  <input type='radio' id={option} name='visiblityOption' value={option} onClick={() => setVisiblity(option)}></input>
                  <label>{option}</label>
                </div>
              )
            })}
          </fieldset>
          <fieldset>
            <legend>weather: </legend>
            {
              WeatherOptions.map(option => {
                return (
                  <div key={option}>
                    <input type='radio' id={option} name="weatherOption" value={option} onClick={() => setWeather(option)} />
                    <label>{option}</label>
                  </div>
                )
              })
            }
          </fieldset>
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

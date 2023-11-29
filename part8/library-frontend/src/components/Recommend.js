import { useQuery } from "@apollo/client"
import { All_Books, CURRENTUSER } from "../queries"
import { useState } from "react"
import BookTable from "./BookTable"

const Recommend = (props) => {
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const currentUserResult = useQuery(CURRENTUSER, {
        onCompleted: (data) => {
            setFavoriteGenre(data.me.favoriteGenre)
        }
    })
    const booksResult = useQuery(All_Books, {
        variables: {genre: favoriteGenre}
    })
    if (!props.show || currentUserResult.loading || booksResult.loading) {
        return null
    }
    return (
        <div>
            <h2>recommendations</h2>
            <div>books in your favourite genre <b>{favoriteGenre}</b></div>
            <BookTable books={booksResult.data.allBooks} />
        </div>
    )
}

export default Recommend
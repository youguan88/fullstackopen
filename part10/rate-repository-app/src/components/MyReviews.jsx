import { FlatList } from "react-native-web"
import { ItemSeparator } from "./SingleRepository"
import { ReviewItem } from "./SingleRepository"

const MyReviews = ({user}) => {
    const reviews = user.reviews.edges.map(edge => edge.node)
    return (
        <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
    />
    )
}

export default MyReviews
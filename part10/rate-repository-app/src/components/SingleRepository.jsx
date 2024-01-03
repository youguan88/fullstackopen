import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";
import { useEffect, useState } from "react";
import Text from "./Text";
import theme from "./theme";
import { format } from 'date-fns'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
        backgroundColor: theme.colors.item,
        display: 'flex',

    },
    marginContainer: {
        margin: 10,
        flexDirection: 'row',
        flexGrow: 1,
    },
    rating: {
        width: '4em',
        height: '4em',
        borderRadius: '2em',
        borderColor: theme.colors.primary,
        borderWidth: '0.2em',
        color: theme.colors.primary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        flex: 1
    },
    columnContainer: {
        flexDirection: 'column',
        padding: '0.5em',
        flex: 1
    },
    username: {
        fontWeight: theme.fontWeights.bold
    },
    createdAt: {
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.normal,
        paddingTop: '0.5em',
        paddingBottom: '0.5em'
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.marginContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.rating}>{review.rating}</Text>
                    <View style={styles.columnContainer}>
                        <Text style={styles.username}>{review.user.username}</Text>
                        <Text style={styles.createdAt}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
                        <Text>{review.text}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const SingleRepository = ({ item }) => {
    const { data } = useSingleRepository(item)
    const [reviews, setReviews] = useState([])
    const [repository, setRepository] = useState(null)

    useEffect(() => {
        if (data) {
            setReviews(data.repository.reviews.edges.map(edge => edge.node))
            setRepository({ ...item, url: data.repository.url })
        }
    }, [data])

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} single={true} />}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default SingleRepository;
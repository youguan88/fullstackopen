import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";
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
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: theme.colors.primary,
        borderWidth: 5,
        color: theme.colors.primary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 5
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

export const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.marginContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.rating}>{review.rating}</Text>
                    <View style={styles.columnContainer}>
                        <Text style={styles.username}>
                            {review.user.username}
                        </Text>
                        <Text style={styles.createdAt}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
                        <Text>{review.text}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const SingleRepository = ({ id }) => {
    const { repository, fetchMore } = useSingleRepository({ id, first: 3 })

    const onEndReach = () => {
        fetchMore()
    }

    const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} single={true} />}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepository;
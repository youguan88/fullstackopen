import { FlatList, View, StyleSheet, Pressable, Text, Alert } from "react-native"
import { ItemSeparator } from "./SingleRepository"
import theme from "./theme"
import { format } from 'date-fns'
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";
import useUser from "../hooks/useUser";
import { useState } from "react";

const styles = StyleSheet.create({
    separator: {
        height: 10,
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
        padding: 0.5,
        flex: 1
    },
    username: {
        fontWeight: theme.fontWeights.bold
    },
    createdAt: {
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.normal,
        paddingTop: 0.5,
        paddingBottom: 0.5
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.item
    },
    pressable: {
        width: '40%',
    },
    viewButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.barText,
        borderRadius: 3,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1em',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    deleteButton: {
        backgroundColor: theme.colors.textError,
        color: theme.colors.barText,
        borderRadius: 3,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1em',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.marginContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.rating}>{review.rating}</Text>
                    <View style={styles.columnContainer}>
                        <Text style={styles.username}>
                            {review.repository.fullName}
                        </Text>
                        <Text style={styles.createdAt}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
                        <Text>{review.text}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const MyReviewItem = ({ item, handleViewRepository, handleDeleteReview }) => {
    return (
        <>
            <ReviewItem review={item} />
            <View style={styles.container}>
                <Pressable onPress={handleViewRepository} style={styles.pressable}>
                    <Text style={styles.viewButton}>View repository</Text>
                </Pressable>
                <Pressable onPress={handleDeleteReview} style={styles.pressable}>
                    <Text style={styles.deleteButton}>Delete review</Text>
                </Pressable>
            </View>
        </>
    )
}

const MyReviews = () => {
    const navigate = useNavigate();
    const { data, refetch } = useUser(true);
    const [deleteReview] = useDeleteReview();
    const [refreshFlatlist, setRefreshFlatList] = useState(false);


    const reviews = data ? data.me ? data.me.reviews.edges.map(edge => edge.node) : null : null
    const handleDeleteReview = (id) => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: async () => {
                    console.log('OK Pressed')
                    await deleteReview(id)
                    refetch()
                    setRefreshFlatList(!refreshFlatlist)
                }
            },
        ]);
    }
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <MyReviewItem item={item} handleDeleteReview={() => handleDeleteReview(item.id)} handleViewRepository={() => navigate(`/repository/${item.repository.id}`)} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            extraData={refreshFlatlist}
        />
    )
}

export default MyReviews
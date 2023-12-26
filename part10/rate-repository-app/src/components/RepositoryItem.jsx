import { View, Text, StyleSheet, Image } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.item,
        display: 'flex'
    },
    image: {
        width: '4em',
        height: '4em',
        borderRadius: 10
    },
    topRowContainer: {
        flexDirection: 'row',
    },
    topColumnContainer: {
        flexDirection: 'column',
        padding: '0.5em'
    },
    bottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomColumnContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: '1em',
    },
    secondaryText: {
        color: theme.colors.textSecondary,
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    language : {
        backgroundColor: theme.colors.primary,
        color: theme.colors.item,
        alignSelf: 'flex-start',
        padding: '0.5em',
        borderRadius: '0.5em'
    }

});

const ItemKeyValue = ({ description, value }) => {
    const numberValue = Number(value) > 1000 ? (Math.round(Number(value) / 100) / 10).toString() + 'k' : Number(value)

    return (
        <View style={styles.bottomColumnContainer}>
            <Text style={styles.mainText}>{numberValue}</Text>
            <Text style={styles.secondaryText}>{description}</Text>
        </View>
    );
}

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRowContainer}>
                <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} resizeMode='contain' />
                <View style={styles.topColumnContainer}>
                    <Text style={styles.mainText}>{item.fullName}</Text>
                    <Text style={styles.secondaryText}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.bottomRowContainer}>
                <ItemKeyValue description="Stars" value={item.stargazersCount} />
                <ItemKeyValue description="Forks" value={item.forksCount} />
                <ItemKeyValue description="Reviews" value={item.reviewCount} />
                <ItemKeyValue description="Rating" value={item.ratingAverage} />
            </View>
        </View>
    )
}

export default RepositoryItem
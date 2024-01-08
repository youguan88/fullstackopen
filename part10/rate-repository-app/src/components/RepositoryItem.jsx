import { View, StyleSheet, Image, Pressable, Linking } from 'react-native';
import theme from './theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.item,
        display: 'flex',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    topRowContainer: {
        flexDirection: 'row',
        margin: 10
    },
    topColumnContainer: {
        flexDirection: 'column',
        padding: 3
    },
    bottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },
    bottomColumnContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    padding: {
        paddingTop: 10,
        paddingBottom: 10
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.item,
        alignSelf: 'flex-start',
        padding: 0.5,
        borderRadius: 5
    },
    github: {
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
        padding: 1,
        margin: 10,
        color: theme.colors.barText
    }
});

const ItemKeyValue = ({ description, value }) => {
    const numberValue = Number(value) > 1000 ? (Math.round(Number(value) / 100) / 10).toString() + 'k' : Number(value)

    return (
        <View style={styles.bottomColumnContainer}>
            <Text fontWeight="bold" fontSize="subheading">{numberValue}</Text>
            <Text color="textSecondary">{description}</Text>
        </View>
    );
}


const GitHubLink = ({ item }) => {
    return (
        <Pressable onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.github}>Open in GitHub</Text>
        </Pressable>
    )
}

const RepositoryItem = ({ item, single }) => {
    if (!item) {
        return null;
    }
    return (
        <View style={styles.container} testID="repositoryItem">
            <View style={styles.topRowContainer}>
                <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} resizeMode='contain' />
                <View style={styles.topColumnContainer}>
                    <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
                    <Text color="textSecondary" style={styles.padding}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.bottomRowContainer}>
                <ItemKeyValue description="Stars" value={item.stargazersCount} />
                <ItemKeyValue description="Forks" value={item.forksCount} />
                <ItemKeyValue description="Reviews" value={item.reviewCount} />
                <ItemKeyValue description="Rating" value={item.ratingAverage} />
            </View>
            {single && (<GitHubLink item={item} />)}
        </View>
    )
}

export default RepositoryItem
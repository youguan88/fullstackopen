import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    const navigate = useNavigate();
    const handleSingleRepository = (item) => {
        navigate(`/repository/${item.id}`)
    }

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Pressable onPress={() => handleSingleRepository(item)}>
                    <RepositoryItem item={item} />
                </Pressable>
            )}
        />
    );
}

const RepositoryList = ({ repositories }) => {
    return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;
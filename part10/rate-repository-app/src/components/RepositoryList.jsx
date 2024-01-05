import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import { Picker } from 'react-native-web';
import { useState } from 'react';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const PickerMenu = ({ orderSelection, setOrderSelection }) => {

    return (
        <Picker selectedValue={orderSelection} onValueChange={(itemValue) => setOrderSelection(itemValue)}>
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest-rated" />
            <Picker.Item label="Lowest rated repositories" value="lowest-rated" />
        </Picker>
    )
}

export const RepositoryListContainer = () => {
    const [orderSelection, setOrderSelection] = useState('latest');
    const { repositories } = useRepositories(orderSelection);
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
            ListHeaderComponent={() => <PickerMenu orderSelection={orderSelection} setOrderSelection={setOrderSelection} />}
            renderItem={({ item }) => (
                <Pressable onPress={() => handleSingleRepository(item)}>
                    <RepositoryItem item={item} />
                </Pressable>
            )}
        />
    );
}

const RepositoryList = () => {
    return <RepositoryListContainer />
};

export default RepositoryList;
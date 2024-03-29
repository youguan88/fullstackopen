import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import React from 'react';
import { useDebounce } from 'use-debounce';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    filterTextBar: {
        margin: '0.5em'
    }
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

const FilterTextBar = ({ filterText, setFilterText }) => {
    return (
        <TextInput value={filterText} onChangeText={(itemValue) => setFilterText(itemValue)} placeholder="Start typing to filter" style={styles.filterTextBar} />
    )
}

const RepositoryListHeader = ({ orderSelection, setOrderSelection, filterText, setFilterText }) => {
    return (
        <>
            <FilterTextBar filterText={filterText} setFilterText={setFilterText} />
            <PickerMenu orderSelection={orderSelection} setOrderSelection={setOrderSelection} />
        </>
    )
}

export class RepositoryListContainer extends React.Component {
    renderHeader = (orderSelection, setOrderSelection, filterText, setFilterText) => {
        return (
            <RepositoryListHeader
                orderSelection={orderSelection}
                setOrderSelection={setOrderSelection}
                filterText={filterText}
                setFilterText={setFilterText}
            />
        );
    };

    render(repositories, orderSelection, setOrderSelection, filterText, setFilterText, onEndReach) {

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
                //ListHeaderComponent={() => <PickerMenu orderSelection={orderSelection} setOrderSelection={setOrderSelection} />}
                ListHeaderComponent={this.renderHeader(orderSelection, setOrderSelection, filterText, setFilterText)}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleSingleRepository(item)}>
                        <RepositoryItem item={item} />
                    </Pressable>
                )}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

const RepositoryList = () => {
    const [orderSelection, setOrderSelection] = useState('latest');
    const [filterText, setFilterText] = useState('');
    const [debouncedFilterText] = useDebounce(filterText, 500);
    const { repositories, fetchMore } = useRepositories({orderSelection: orderSelection, debouncedFilterText: debouncedFilterText, first: 3});
    const container = new RepositoryListContainer
    const onEndReach = () => {
        fetchMore();
      };
    return (
        container.render(repositories, orderSelection, setOrderSelection, filterText, setFilterText, onEndReach)
    )
};

export default RepositoryList;
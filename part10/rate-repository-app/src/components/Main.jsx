import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from './theme';
import { Navigate, Route, Routes, useMatch } from 'react-router-native';
import SignIn from './SignIn';
import useRepositories from '../hooks/useRepositories';
import SingleRepository from './SingleRepository';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.main  
    },
});

const Main = () => {
    const { repositories } = useRepositories();
    const idMatch = useMatch('/repository/:id');
    if (!repositories)
    {
        return null
    }
    const singleRepository = idMatch ? repositories.edges.find(x=>x.node.id === idMatch.params.id).node : null

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList repositories={repositories}/>} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/repository/:id' element={<SingleRepository item={singleRepository}/>} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </View>
    );
};

export default Main;
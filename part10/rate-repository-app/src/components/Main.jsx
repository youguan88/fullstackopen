import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from './theme';
import { Navigate, Route, Routes, useMatch } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.main  
    },
});

const Main = () => {
    const idMatch = useMatch('/repository/:id');
    const id = idMatch ? idMatch.params.id: null

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/createReview' element={<CreateReview />} />
                <Route path='/repository/:id' element={<SingleRepository id={id}/>} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </View>
    );
};

export default Main;
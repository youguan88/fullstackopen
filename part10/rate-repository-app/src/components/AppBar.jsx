import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import AppBarItem from './AppBarItem';
import { Link } from 'react-router-native';
import { ScrollView } from 'react-native-web';
import useUser from '../hooks/useUser';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingLeft: '1em',
        backgroundColor: theme.colors.bar,
        color: theme.colors.barText,
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
    },
    link: {
        paddingRight: '1em'
    }
});

const AppBar = () => {
    const [user, setUser] = useState(null);
    const {data} = useUser();
    
    useEffect(() => {
        if (data)
        {
            setUser(data.me)
        }
    }, [data])

    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const handleSignOut = async (event) => {
        event.preventDefault();
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" style={styles.link}><AppBarItem content='Repositories' /></Link>
                {!user && (<Link to="/signin" style={styles.link}><AppBarItem content='Sign in' /></Link>)}
                {user && (<Link to="/" style={styles.link} onPress={handleSignOut}><AppBarItem content='Sign out' /></Link>)}
            </ScrollView>
        </View>
    );
};

export default AppBar;
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import AppBarItem from './AppBarItem';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.bar,
        color: theme.colors.barText,
        display: 'flex',
        flexDirection:'row',
        flexGrow: 0,
    },
    link: {
        paddingRight: '1em'
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Link to="/" style={styles.link}><AppBarItem content='Repositories' /></Link>
            <Link to="/signin" style={styles.link}><AppBarItem content='Sign in' /></Link>
        </View>
    );
};

export default AppBar;
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import AppBarItem from './AppBarItem';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.backgroundTextPrimary
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarItem content='Repositories'/>
        </View>
    );
};

export default AppBar;
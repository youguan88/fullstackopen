import { Text, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.barText
    }
});

const AppBarItem = ({content}) => {
    return (
            <Text style={styles.text}>{content}</Text>
    );
}

export default AppBarItem
import { Pressable } from 'react-native';

const AppBarItem = ({content}) => {
    return (
        <Pressable>
            {content}
        </Pressable>
    );
}

export default AppBarItem
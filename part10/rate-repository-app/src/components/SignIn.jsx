import Text from './Text';
import { View } from 'react-native-web';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from './theme';

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const styles = StyleSheet.create(
  {
    button: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.barText,
      borderRadius: '0.3em',
      height: '5em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      padding: '1em',
      backgroundColor: theme.colors.item
    },
    textInput: {
      border: '2px gray solid',
      height: '5em',
      borderRadius: '0.3em',
      marginBottom: '0.5em',
      paddingLeft: '1em',
      color: theme.colors.textSecondary,
      fontSize: theme.fontSizes.body
    }
  }
)


const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username" style={styles.textInput} />
    <FormikTextInput name="password" placeholder="Password" style={styles.textInput} />
    <Pressable onPress={onSubmit}>
      <Text style={styles.button}>Sign in</Text>
    </Pressable>
  </View>
  )
}

const SignIn = () => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignIn;
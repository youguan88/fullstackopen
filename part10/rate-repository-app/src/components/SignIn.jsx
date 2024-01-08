import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import theme from './theme';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create(
  {
    button: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.barText,
      borderRadius: 5,
      height: 50,
      marginTop: 1,
      width: '50%',
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    pressable : {
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      padding: 10,
      backgroundColor: theme.colors.item
    }
  }
)

export const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable onPress={onSubmit} style={styles.pressable}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export const SignInFormContainer = ({onSubmit, initialValues, validationSchema}) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInFormContainer onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema} />
  )
};

export default SignIn;
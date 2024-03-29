import { Formik } from "formik"
import FormikTextInput from "./FormikTextInput"
import Text from "./Text"
import { StyleSheet, Pressable, View } from "react-native"
import theme from "./theme"
import * as yup from 'yup'
import useSignUp from "../hooks/useSignUp"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"

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

const initialValues = {
    username: '',
    password: '',
    confirmationPassword: ''
}

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),
    password: yup.string().required("Password is required").min(5).max(50),
    confirmationPassword: yup.string().required("Password confirmation is required").oneOf([yup.ref('password')], 'Password need to match')
})

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
            <FormikTextInput name="confirmationPassword" placeholder="Password confirmation" secureTextEntry={true} />
            <Pressable onPress={onSubmit} style={styles.pressable}>
                <Text style={styles.button}>Sign up</Text>
            </Pressable>
        </View>
    )
}

const SignUp = () => {
    const [signUp] = useSignUp()
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        try {
            const { username, password } = values;
            const createdUser = await signUp({ username, password })
            if (createdUser) {
                await signIn({ username, password })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default SignUp
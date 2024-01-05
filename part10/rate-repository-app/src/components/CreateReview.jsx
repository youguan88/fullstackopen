import { Formik } from "formik"
import { View, Text, StyleSheet } from "react-native-web"
import * as yup from 'yup'
import FormikTextInput from "./FormikTextInput"
import { Pressable } from "react-native"
import theme from "./theme"
import useCreateReview from "../hooks/useCreateReview"
import { useNavigate } from "react-router-native"

const initialValues = {
    repositoryName: "",
    ownerName: "",
    rating: "",
    text: ""
}

const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository Name is required'),
    ownerName: yup.string().required('Repository Owner Name is required'),
    rating: yup.number().required('Rating is required').min(0).max(100),
    text: yup.string()
})

const styles = StyleSheet.create(
    {
        button: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.barText,
            borderRadius: '0.3em',
            height: '5em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1em'
        },
        container: {
            padding: '1em',
            paddingTop: '0',
            backgroundColor: theme.colors.item
        }
    }
)

export const CreateReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text" placeholder="Review" />
            <Pressable onPress={onSubmit}>
                <Text style={styles.button}>Create a Review</Text>
            </Pressable>
        </View>
    )
}

const CreateReview = () => {
    const [createReview] = useCreateReview()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        try {
            const { repositoryName, ownerName, rating, text } = values;
            const data  = await createReview(repositoryName, ownerName, rating, text)
            navigate(`/repository/${data.createReview.repositoryId}`)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default CreateReview
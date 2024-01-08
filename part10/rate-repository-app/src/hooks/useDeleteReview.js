import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        onError: (error) => {
            console.log(error)
        }
    })

    const deleteReview = async ( reviewId ) => {
        const { data } = await mutate({
            variables: {
                deleteReviewId: reviewId
                }
            })
        return data;
    }

    return [deleteReview, result]

}

export default useDeleteReview
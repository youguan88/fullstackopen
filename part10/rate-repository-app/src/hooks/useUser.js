import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/queries"

const useUser = () => {
    const User = useQuery(GET_USER, {fetchPolicy:'cache-and-network', variables:{includeReviews : true}})
    return User;
}

export default useUser;
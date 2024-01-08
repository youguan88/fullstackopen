import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/queries"
import { useState } from "react"
import { useEffect } from "react";

const useUser = (includeReviews) => {
    const [data, setData] = useState();
    let variables = {};
    if (includeReviews) {
        variables.includeReviews = true
    }
    const User = useQuery(GET_USER, { fetchPolicy: 'cache-and-network', variables: variables, notifyOnNetworkStatusChange: true, })
    const fetchUser = async() => {
        if (!User.loading && User.data) {
            setData(User.data)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [User])
    return { data, refetch: User.refetch };
}


export default useUser;
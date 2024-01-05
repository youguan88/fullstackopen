import { useQuery } from "@apollo/client"
import { GET_SINGLE_REPOSITORY } from "../graphql/queries"
import { useEffect, useState } from "react"

const useSingleRepository = (id) => {
    const [data, setData] = useState();
    const response = useQuery(GET_SINGLE_REPOSITORY,
        { variables: { "repositoryId": id }, fetchPolicy: 'cache-and-network' }
    )
    const fetchRepository = async () => {
        if(!response.loading && response.data)
        {
            setData(response.data)
        }
    }
    useEffect(()=> {
        fetchRepository()
    },[response])

    return {data, refetch: fetchRepository};

}

export default useSingleRepository;
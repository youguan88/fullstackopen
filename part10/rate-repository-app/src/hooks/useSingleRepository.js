import { useQuery } from "@apollo/client"
import { GET_SINGLE_REPOSITORY } from "../graphql/queries"

const useSingleRepository = ({item}) => {
    const repository = useQuery(GET_SINGLE_REPOSITORY, {variables:{"repositoryId": item.id}, fetchPolicy:'cache-and-network'})
    return repository;
}

export default useSingleRepository;
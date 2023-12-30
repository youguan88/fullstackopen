import { useApolloClient, useMutation } from "@apollo/client";
import { signInToken } from '../graphql/mutations'
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(signInToken, {
        onError: (error) => {
            console.log(error);
        }
    });
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {

        const { data } = await mutate({variables: {credentials: {username, password}}});
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
    };

    return [signIn, result];
};

export default useSignIn;
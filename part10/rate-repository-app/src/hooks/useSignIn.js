import { useMutation } from "@apollo/client";
import { signInToken } from '../graphql/mutations'

const useSignIn = () => {
    const [mutate, result] = useMutation(signInToken, {
        onError: (error) => {
            console.log(error);
        }
    });

    const signIn = async ({ username, password }) => {
        console.log({ credentials: {username, password }}
            )
        return await mutate({variables: {credentials: {username, password}}})
    };

    return [signIn, result];
};

export default useSignIn;
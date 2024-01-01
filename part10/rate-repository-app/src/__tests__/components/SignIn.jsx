import { validationSchema, SignInFormContainer } from "../../components/SignIn";
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';


const initialValues = {
    username: '',
    password: '',
  };

describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn();
        render(<SignInFormContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}/>)
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'elina');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign in'));

        await waitFor(() => {
          // expect the onSubmit function to have been called once and with a correct first argument
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'elina',
            password: 'password',
        });
      });
    });
})});
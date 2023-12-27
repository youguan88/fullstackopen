import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.textError
  },
  errorBorder: {
    borderColor: theme.colors.textError,
  },
  textInput: {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: theme.colors.textSecondary,
    height: '5em',
    borderRadius: '0.3em',
    marginTop: '1em',
    paddingLeft: '1em',
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body
  }
});


const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const textStyle = [
    styles.textInput,
    showError && styles.errorBorder
  ]
  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={textStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
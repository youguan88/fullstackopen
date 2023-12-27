import { Platform } from "react-native";

const theme = {
    colors: {
      primary: '#0366d6',
      bar: '#24292e',
      barText: '#FFFFFF',
      main: '#e1e4e8',
      item: '#FFFFFF',
      textPrimary: '#24292e',
      textSecondary: '#586069',
      textError: '#d73a4a'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;
import { DefaultTheme } from 'react-native-paper';

const CustomPaperNativeTheme : ReactNativePaper.Theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222',
    accent: '#f50057',
  },
}

export default CustomPaperNativeTheme;
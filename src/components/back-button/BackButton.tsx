import { Button } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface BackButtonProps {
  onPress?: () => void;
  size?: number;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 20
  }
});

export default function BackButton({
  onPress = () => {},
  size = 20
}: BackButtonProps) {
  const {
    button,
  } = styles;

  return (
    <Button 
      style={button} 
      onPress={onPress}
      >
      <Ionicons 
        name="arrow-back" 
        size={size}
      />
    </Button>
  )
}
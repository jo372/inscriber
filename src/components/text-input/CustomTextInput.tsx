import { TextInput } from "react-native-paper";

type CustomTextInputAutoCompleteType = 'on' | 'off';

interface CustomTextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoComplete?: CustomTextInputAutoCompleteType;
}

export default function CustomTextInput({
  label = '',
  value = '',
  onChangeText = () => {},
  autoComplete = "on",
}: CustomTextInputProps) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      autoComplete={autoComplete}
    />
  );
}

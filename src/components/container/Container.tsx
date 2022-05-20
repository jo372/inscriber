import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Container({
  children = [],
  style
}: ContainerProps) {

  const { 
    container,
    containerContent
  } = styles;

  const mergedStyles = [container, style];
  return <View style={mergedStyles}>
    <View style={containerContent}>
    { children }
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: 'column'
  },
  containerContent: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: 'wrap',
    maxWidth: 600
  }
});
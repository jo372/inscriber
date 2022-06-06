import { StyleSheet, View } from "react-native";

interface FooterMenuProps {
  children: React.ReactNode[] | React.ReactNode;
}

export default function FooterMenu(props: FooterMenuProps) {
  const { children } = props;

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

import { StyleSheet } from "react-native";

const GlobalTheme = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    width: "80%",
    alignSelf: 'center',
    marginTop: 25
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    borderWidth: 1,
    color: '#fff'
  },
  title: {
    fontSize: 20
  },
  marginTop10: {
    marginTop: 10
  },
  marginBottom10: {
    marginBottom: 10
  },
  text: {
    marginTop: 10,
    marginBottom: 10
  },
  textCentered: {
    textAlign: 'center'
  },
  link: {
    textDecorationLine: "underline"
  },
  pl10: {
    paddingLeft: 10
  },
  ml10: {
    marginLeft: 10
  },
  input: {
    borderWidth: 0
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 300,
    maxHeight: 300
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10
  },
  scrollViewStyle: {
    flex: 1,
  }
});

export default GlobalTheme;
import { useCallback } from "react";
import { Alert, Linking } from "react-native";

export default class URLHandler {
  public static openURL(url: string) {
    return useCallback(async() => {
      const supported = await Linking.canOpenURL(url);
      if(supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  }
}
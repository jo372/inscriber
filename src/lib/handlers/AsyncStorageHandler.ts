import AsyncStorage from "@react-native-async-storage/async-storage";

interface AsyncStorageKeyObject {
  
}

const AsyncStorageKeys : AsyncStorageKeyObject = {

}

export default class AsyncStorageHandler {
  public static async setItem(key: string, value: string): Promise<void> {
    return await AsyncStorage.setItem(key, value);
  }
  public static async clear() {
    return await AsyncStorage.clear();
  }
}
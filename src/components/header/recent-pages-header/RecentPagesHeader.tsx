import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PageItem, { PageItemProps } from "../../page-item/PageItem";

interface RecentPagesProps {}

const { 
  width: deviceWidth,
  height: deviceHeight 
} = Dimensions.get('window');

export default function RecentPagesHeader(props: RecentPagesProps) {
  
  const [recentPages, setRecentPages] = React.useState<PageItemProps[]>([
    {
      text: "Page 1",
      onPress: () => {
        console.log("Page 1");
      },
      url: "https://www.google.com",
    },
    {
      text: "Page 2",
      onPress: () => {
        console.log("Page 2");
      },
      url: "https://www.google.com",
    }
  ]);
  
  const clearRecentPages = React.useCallback(() => {
    setRecentPages([]);
    // TODO: Clear recent pages from database
  }, []);

  return <View style={styles.container}>
    <View style={styles.header}>
      <Text>Recent Pages</Text>
      <Text onPress={clearRecentPages}>Clear</Text>
    </View>
    <View style={styles.headerContent}>
      {
        recentPages.map((page, index) => {
          return <PageItem key={index} {...page} />
        })
      }
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: deviceWidth * 0.8   
  },
  header: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent:  'space-between',
    marginLeft: 5,
    marginRight: 5,
  },
  headerContent: {
    justifyContent: 'center',
  }
});
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { IconButton } from "react-native-paper";

export interface PageItemProps {
  text?: string;
  url?: string; 
  onPress?: () => void;
}

export default function PageItem(props: PageItemProps) {
  const { text, url, onPress } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);

  const onPressHandler = React.useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const toggleExpand = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.item} onPress={onPress}>
        <Text>{text}</Text>
        <IconButton
          icon="dots-vertical"
          size={20}
          style={{
            zIndex: 500
          }}
          onPress={toggleExpand}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={style.expanded}>
          <FlatList
            data={[
              {key: 'Create Note'},
              {key: 'Duplicate Note'},
              {key: 'Delete Note'}
            ]}
            renderItem={({item}) => <Text style={style.item}>{item.key}</Text>}
          />
        </View>
      )}
    </View>
  );
}

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "#e6f2ed",
    backgroundColor: "#f0fff8",
    maxWidth: (deviceWidth * 0.9)
  },
  expanded: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: deviceWidth * 0.5,
  }
});
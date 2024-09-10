import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import StylesForBlogDetailScreen from "../styles/stylesForBlogDetailScreen";
import { useRoute } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";
import * as htmlparser2 from 'htmlparser2';

export default function BlogDetailScreen() {
  const route = useRoute();
  const item = route.params?.item;
  console.log("item", item);
  const contentWidth = Dimensions.get("window").width;
  const htmlContent = item.content;

  

  return (
    <View style={StylesForBlogDetailScreen.container}>
      <Text style={StylesForBlogDetailScreen.heading}>{item?.heading}</Text>
      <Text style={StylesForBlogDetailScreen.dateCreated}>
        {item.dateCreated}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <RenderHTML
          contentWidth={contentWidth}
          source={{ html: htmlContent }}
          tagsStyles={styles}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    fontSize: 15,
    textAlign: "justify",
    color: "white",
  },
  h1: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  img: {
    width: '100%', // Ensure image scales to the width of the container
    height: undefined, // Maintain aspect ratio
    resizeMode: "contain", // Fit image within the container
  },
});

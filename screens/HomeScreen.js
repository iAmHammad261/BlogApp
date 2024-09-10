import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState , useCallback} from "react";
import stylesForHomeScreen from "../styles/stylesForHomeScreen";
import { storage } from "../mmkv/mmkv.js";
import * as htmlparser2 from "htmlparser2";
import { FlashList } from "@shopify/flash-list";
import ClockIcon from "../components/clockIcon";
import UserIcon from '../components/userIcon';
import PenLine from '../components/PenLine.js';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";




export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const extractH1 = (html) => {
    let h1Content = "";
    let insideH1 = false; // Flag to track if inside <h1> tag

    const parser = new htmlparser2.Parser(
      {
        onopentag(name) {
          if (name === "h1") {
            insideH1 = true; // Set flag when entering <h1> tag
            h1Content = ""; // Clear previous content
          }
        },
        ontext(text) {
          if (insideH1) {
            h1Content += text; // Accumulate text if inside <h1>
          }
        },
        onclosetag(name) {
          if (name === "h1") {
            insideH1 = false; // Reset flag when closing </h1> tag
          }
        },
      },
      { decodeEntities: true }
    );

    parser.write(html);
    parser.end();

    return h1Content.trim(); // Remove any leading or trailing whitespace
  };

  const extractImageSrc = (html) => {
    let imgSrc = ""; // Variable to store the src value

    const parser = new htmlparser2.Parser(
      {
        onopentag(name, attribs) {
          if (name === "img" && attribs.src) {
            imgSrc = attribs.src; // Capture the src attribute of the <img> tag
          }
        },
      },
      { decodeEntities: true }
    );

    parser.write(html);
    parser.end();

    // console.log("imgsrc", imgSrc);

    return imgSrc; // Return the src value (remove any leading/trailing whitespace)
  };

  const extractFirstLineExcludingH1 = (html) => {
    let firstLine = ""; // Variable to store the first line
    let insideH1 = false; // Flag to track if we are inside an <h1> tag
    let lineCaptured = false; // Flag to track if the first line has been captured

    const parser = new htmlparser2.Parser(
      {
        onopentag(name) {
          if (name === "h1") {
            insideH1 = true; // Set the flag when entering <h1> tag
          }
        },
        ontext(text) {
          if (!insideH1 && !lineCaptured) {
            // Only process text if not inside <h1> and first line hasn't been captured
            const textLines = text.split("."); // Split text by periods
            for (let line of textLines) {
              if (line.trim()) {
                // Check if the line is not empty
                firstLine = line.trim(); // Store the line
                lineCaptured = true; // Mark the line as captured
                break; // Stop after capturing the first line
              }
            }
          }
        },
        onclosetag(name) {
          if (name === "h1") {
            insideH1 = false; // Reset the flag when closing </h1> tag
          }
        },
      },
      { decodeEntities: true }
    );

    parser.write(html);
    parser.end();

    // Return the first line found
    // const words = firstLine.split(/\s+/).slice(0, 5); // Capture the first 5 words of the line
    return firstLine;
  };

  const convertToReadableFormat = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    // Convert to a format like "8 September 2024"
    return date.toLocaleDateString("en-US", options);
  };

  const pressableForCreateBlog = () => {
    navigation.navigate('BlogEditingScreen');
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = () => {
        const keys = storage.getAllKeys();
        console.log("keys: " , keys)
        storage.delete('691065');
    
        const fetchedItems = keys.map((key) => {
          const data = JSON.parse(storage.getString(key)) || "";
          return {
            key,
            heading: extractH1(data.content),
            content: data.content,
            firstThreeLines: extractFirstLineExcludingH1(data.content),
            imageSrc: extractImageSrc(data.content),
            dateCreated: convertToReadableFormat(data.date),
          };
        });
        setItems(fetchedItems);
      };
  
      fetchData();
  
      return () => {
        // Optional cleanup if needed
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={()=>{navigation.navigate('BlogDetailScreen',  {item})}}>
    <View style={stylesForHomeScreen.item}>
      <Image
        style={stylesForHomeScreen.image}
        source={{ uri: item.imageSrc }}
      />
      <View style={stylesForHomeScreen.HeadingAndDescription}>
        <Text style={stylesForHomeScreen.heading}>{item.heading}</Text>
        <View style={stylesForHomeScreen.viewForText}>
          <Text numberOfLines={2} style={stylesForHomeScreen.text}>
            {item.firstThreeLines}
          </Text>
          <View style={stylesForHomeScreen.IconAndDateAndAuthor}>
            <View style={stylesForHomeScreen.IconAndDate}>
              <ClockIcon stroke={"white"} width={18} height={18} />
              <Text style={stylesForHomeScreen.dateCreated}>
                {item.dateCreated}
              </Text>
            </View>
            <View style={stylesForHomeScreen.IconAndAuthor}>
            <UserIcon stroke={"white"} width={18} height={18}/>
            <Text style={stylesForHomeScreen.Author}>You</Text>

            </View>
          </View>
        </View>
      </View>
    </View>
    </Pressable>
  );

  return (
    <View style={stylesForHomeScreen.container}>
      <View style={{backgroundColor: 'black',  width: '111%', height: '10%', position: 'absolute', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>

      </View>
      <View style={stylesForHomeScreen.viewForTextOfHeadingBlog}>
        <Text style={stylesForHomeScreen.textForHeading}>BLOGS</Text>
        <Pressable style={stylesForHomeScreen.pressableForCreate} onPress={pressableForCreateBlog}>
        <PenLine stroke={'white'} height={26} width={26}  />
        </Pressable>
      </View>
      <FlashList
        // contentContainerStyle={stylesForHomeScreen.contentContainerStyle}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        estimatedItemSize={76}
        showsVerticalScrollIndicator={false}
        // numColumns={2}
      />
    </View>
  );
}

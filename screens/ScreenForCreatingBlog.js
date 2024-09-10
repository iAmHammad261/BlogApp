import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Pressable,
  ToastAndroid,
} from "react-native";
// import { S3Client } from '@aws-sdk/client-s3'
import React, { useRef, useEffect, useState } from "react";
// import RNFetchBlob from 'react-native-fetch-blob';
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import stylesForEditingScreen from "../styles/stylesForEditingScreen.js";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import BanIcon from "../components/banIcon.js";
import SaveIcon from "../components/saveIcon.js";
// import PenLine from "../components/penLine.js";
// import { MM } from "react-native-mmkv";
// import AppData from '../assets/json/AppData.json'
import { storage } from "../mmkv/mmkv.js";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";

const handleHead = ({ tintColor }) => (
  <Text
    style={{ color: tintColor, fontSize: 18, marginTop: -1.35, marginLeft: 1 }}
  >
    H1
  </Text>
);

// export const storage = new MMKV();

const INITIAL_HTML_CONTENT = new Array(30).fill("<div><br></div>").join("");

export default function ScreenForCreatingBlog() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const supabase = createClient(
    "https://bqckdsqftmskltufhkib.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxY2tkc3FmdG1za2x0dWZoa2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2OTQ3MDAsImV4cCI6MjA0MTI3MDcwMH0.8BZevVObV9eOF3KCIcAtTid07JG7An7c9foFOqo7v6M"
  );
  const editor = useRef();
  const scrollViewRef = useRef();
  const contentOfEditors = useRef();
  const [visibiltyOfCancelToolTip, setVisibiltyOfCancelToolTip] =
    useState(false);
  const [visibiltyOfSaveToolTip, setVisibiltyOfSaveToolTip] = useState(false);

  const convertVideoToBase64 = async (fileUri) => {
    try {
      // Read the video file as a Base64 string
      const base64Video = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      //

      // Return the Base64 string
      return base64Video;
    } catch (error) {
      console.error("Error converting video to Base64:", error);
      throw error;
    }
  };

  const uploadImageToSupabase = async (fileUri, fileName) => {
    try {
      const deco = await convertVideoToBase64(fileUri);
      //
      const decoded = decode(deco);
      //

      // Upload the file to Supabase
      const { data, error } = await supabase.storage
        .from("Videos") // Replace 'Files' with your bucket name
        .upload(fileName, decoded, {
          cacheControl: "3600",
          upsert: true,
          contentType: "video/mp4",
        });

      if (error) {
        throw error;
      }

      // return data.path; // or any relevant property from the response
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const getThePressedImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    return result;
  };

  const getUriAndFilenameOfTheVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    return {
      uri: result.assets[0].uri,
      filename: result.assets[0].fileName,
    };
  };

  //   const convertUriToBase64 = async (uriOfVideoObtained) => {
  //     try {
  //       // Convert the video file to Base64
  //       const base64Video = await FileSystem.readAsStringAsync(uriOfVideoObtained, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });

  //       //
  //       return base64Video;

  //     } catch (error) {
  //       console.error('Error converting video to Base64:', error);
  //     }
  //  //
  //   }

  // const prepareDataUri = async () => {

  //   const {uri, mime} = await getUriAndMimeTypeOfTheVideo();
  //   const base64 = await convertUriToBase64(uri);

  //   return `data:${mime};base64,${base64}`

  // }

  const getUriOfTheVideoFromSupabase = async (filename) => {
    const { data, error } = supabase.storage
      .from("Videos")
      .getPublicUrl(filename);

    return data.publicUrl;
  };

  const insertVideoInEditor = async () => {
    const uriAndFileNameOfVideo = await getUriAndFilenameOfTheVideo();

    const uriOfTheFetchedVideo = await uploadImageToSupabase(
      uriAndFileNameOfVideo.uri,
      uriAndFileNameOfVideo.filename
    );

    const publicUrl = await getUriOfTheVideoFromSupabase(
      uriAndFileNameOfVideo.filename
    );

    // //
    editor.current?.insertHTML(`
      <div>
        <video controls">
          <source src="${publicUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
    `);

    // const videoObtained =  await getTheVideo();
    // const base64 = videoObtained.assets[0].base64;
    // const mimeType = videoObtained.assets[0].mimeType;
    //
    //

    // const videoUrl = `data:${mimeType};base64,${base64}`;
    //

    // editor.current.insertVideo(videoUri);
  };

  const setContentOfEditor = (text) => {
    contentOfEditors.current = text;
  };

  const prepareImageUrlForInsertionInEditor = async () => {
    const imageObtained = await getThePressedImage();
    const base64 = imageObtained.assets[0].base64;
    const mimeType = imageObtained.assets[0].mimeType;

    return `data:${mimeType};base64,${base64}`;
  };

  const insertImageInEditor = async () => {
    const imageUrl = await prepareImageUrlForInsertionInEditor();

    editor.current.insertImage(imageUrl, "height: 100, width: 100");
  };

  const onLongPressOfCancel = () => {
    //
    setVisibiltyOfCancelToolTip(true);
  };

  const onLongPressOfSave = () => {
    //
    setVisibiltyOfSaveToolTip(true);
  };

  const onPressOutOfPressableOfSave = () => {
    //
    setVisibiltyOfSaveToolTip(false);
  };

  const onPressOutOfPressableOfCancel = () => {
    setVisibiltyOfCancelToolTip(false);
  };

  function generateSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const createStringForComparison = (content) => {
    //

    const numberOfDiv = content.match(/<div[^>]*>/gi).length;
    //
    //
    //
    return new Array(numberOfDiv).fill("<div><br></div>").join("");
  };

  const onPressOfSave = () => {
    if (
      contentOfEditors.current !== INITIAL_HTML_CONTENT &&
      contentOfEditors.current !==
        createStringForComparison(contentOfEditors.current)
    ) {
      //
      const objectToBeSaved = {
        idOfBlog: generateSixDigitNumber(),
        content: contentOfEditors.current,
        date: new Date(),
      };

      const jsonString = JSON.stringify(objectToBeSaved);

      storage.set(objectToBeSaved.idOfBlog.toString(), jsonString);
      navigation.navigate("HomeScreen");
    } else {
      const msg = "⚠  Please enter something to begin.";
      ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      // navigation.navigate('HomeScreen')
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setVisible(false);
    navigation.navigate("HomeScreen");
  };

  const onPressOfCancel = () => {
    setVisible(true);
    console.log("Cancelled");
  };

  return (
    <View style={stylesForEditingScreen.containerOfTheView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={{flexGrow:1}}
        // style={{backgroundColor: 'white'}}
      >
        <View style={stylesForEditingScreen.viewForPressable}>
          <View style={stylesForEditingScreen.viewForPressableOfControl}>
            <Pressable
              onLongPress={onLongPressOfCancel}
              onPressOut={onPressOutOfPressableOfCancel}
              onPress={onPressOfCancel}
              style={stylesForEditingScreen.pressableForControls}
            >
              <BanIcon />
            </Pressable>
            {visibiltyOfCancelToolTip ? (
              <View>
                <Text style={stylesForEditingScreen.textForToolTip}>
                  Cancel
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
          <View style={stylesForEditingScreen.viewForPressableOfControl}>
            {visibiltyOfSaveToolTip ? (
              <View>
                <Text style={stylesForEditingScreen.textForToolTip}>Save</Text>
              </View>
            ) : (
              <View></View>
            )}
            <Pressable
              style={stylesForEditingScreen.pressableForControls}
              onPress={onPressOfSave}
              onLongPress={onLongPressOfSave}
              onPressOut={onPressOutOfPressableOfSave}
            >
              <SaveIcon />
            </Pressable>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            backgroundColor: "#333333",
          }}
          onContentSizeChange={() => {
            // scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <RichEditor
            ref={editor}
            editorStyle={stylesForEditingScreen.editorStyle}
            onChange={(text) => {
              setContentOfEditor(text);
            }}
            editorInitializedCallback={() => {
              contentOfEditors.current = INITIAL_HTML_CONTENT;
            }}
            initialContentHTML={INITIAL_HTML_CONTENT}
            initialFocus
            // onFocus={()=>{editor.current.focus()}}
            // useContainer={false}
            // initialHeight={ Dimensions.get("screen").height * 0.5 }
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <RichToolbar
        editor={editor}
        actions={[
          actions.insertImage,
          actions.insertVideo,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.insertOrderedList,
          actions.insertBulletsList,
          actions.redo,
          actions.undo,
          actions.alignCenter,
          actions.alignLeft,
          actions.alignCenter,
          actions.setStrikethrough,
          actions.setSubscript,
          actions.setSuperscript,
          actions.insertLink,
          actions.code,
        ]}
        style={stylesForEditingScreen.toolbar}
        iconMap={{ [actions.heading1]: handleHead }}
        iconTint={"white"}
        selectedIconTint={"grey"}
        iconSize={22}
        onPressAddImage={insertImageInEditor}
        // onPressAddVideo={insertVideoInEditor}
        insertVideo={insertVideoInEditor}
      />
      <View>
        <Dialog.Container visible={visible} contentStyle={{backgroundColor: 'black', borderRadius: 14}}>
          <Dialog.Title style={{fontSize: 20, fontWeight: '800'}}>Confirm cancellation</Dialog.Title>
          <Dialog.Description style={{color: 'white' ,fontSize:15}}>
            Do you want to cancel? The blog created will be lost
          </Dialog.Description>
            <Dialog.Button style={{color: 'white', fontWeight: '800'}} label="Cancel" onPress={handleCancel} />
            <Dialog.Button style={{color: 'white', fontWeight: '800'}} label="confirm" onPress={handleConfirm} />
        </Dialog.Container>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({});

import { StyleSheet } from "react-native";

const stylesForEditingScreen = StyleSheet.create({
  toolbar: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  containerOfTheView: {
    flex: 1,
    backgroundColor: "#333333",
  },
  editorStyle: {
    backgroundColor: "#333333",
    color: "white",
  },
  viewForPressable: {
    backgroundColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    padding: '4%'
  },
  pressableForCancel : {
    paddingHorizontal: '4%'
    // backgroundColor: 'white',
    // padding: '2%',
    // borderRadius: 12
  }, 
  viewForPressableOfControl : {
    flexDirection: 'row',
    gap: 20,
  },
  textForToolTip: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default stylesForEditingScreen;

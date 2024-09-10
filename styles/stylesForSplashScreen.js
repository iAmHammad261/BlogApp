import { StyleSheet } from "react-native";

export default styleForSplashScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    // flexDirection: 'row',
  },
  forUpperPortion: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.6,
    // flex: 0.3s
  },
  mainHeadingText: {
    color: "white",
    fontSize: 64,
    fontFamily: 'RobotoMono-Bold',
    letterSpacing: 5,
    // elevation: 10,
  },
  lineBelowText: {
    height: 10,
    backgroundColor: "black",
    width: "200%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: '5%',
  },
  subheading: {
    color: "white",
    opacity: 0,
    margin: "5%",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  viewForTheLowerPotion: {
    flexDirection: "column",
    // alignItems: 'center',
    paddingHorizontal: "15%",
    justifyContent: "flex-end",
    // borderColor: 'white',
    // borderWidth: 5,
    flex: 0.30,
    // flex: 0.5s
  },
  viewForIconAndNameOfApp : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
  },
  styleForTheSliderContainer: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    // backgroundColor: '#50C878'
  },
  loaderBehindTheIcon: {
    backgroundColor: "black",
    height: "100%",
    // width: "50%",
    borderRadius: 8,
    position: "absolute"
  },
  animationOfBook : {
    height: 400,
    width: 400,

  }
});

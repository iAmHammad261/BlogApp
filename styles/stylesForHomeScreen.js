import { StyleSheet } from "react-native";

export default stylesForHomeScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    padding: "5%",
  },
  textForHeading: {
    marginTop: '-3%',
    fontSize: 32,
    color: "white",
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  heading: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: "#E6E6FA",
    height: 45,
    flexShrink: 1,
    textAlign: 'justify'
  },
  item: {
    backgroundColor: "#1d1d1d",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
    paddingHorizontal: "14.5%",
    width: "100%",
    paddingVertical: '5%',
    elevation: 10,
  },
  viewForTextOfHeadingBlog: {
    // marginBottom: "5%",
    // borderBottomWidth: 2,
    flexDirection: 'row',
    // backgroundColor: 'black',
    // width: '200%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: "5%",
    width: '95%',
    // borderWidth: 5,
    // height: 50
    // borderColor: "white",
  },
  image: {
    width: "30%",
    height: "70%",
    borderRadius: 5,
    // width: '100%',
    // height: '100%',
  },
  HeadingAndDescription: {
    gap: 5,
    // marginRight: '-5%',
    // borderTopWidth: 2,
    // borderColor: '#ffffff'
  },
  viewForText: {
    // width: '95%'
  },
  // contentContainerStyle: {
  //     gap: 100
  // }
  dateCreated: {
    color: 'white',
    fontSize: 10,
  },
  Author: {
    color: 'white',
    fontSize: 10,
  },
  IconAndDateAndAuthor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  IconAndDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  IconAndAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  pressableForCreate: {
    paddingLeft: '4%',
    // borderWidth: 2,
    paddingVertical: '4%'

    // paddingHorizontal: '2%',
    // borderWidth: 4
  }
});

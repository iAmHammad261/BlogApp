import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import styleForSplashScreen from "../styles/stylesForSplashScreen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import ChevronRight from "../components/chevronRight.js";
import NotebookPen from "../components/notebookPen.js";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
import { runOnJS } from 'react-native-reanimated';

const widthOfScreen = Dimensions.get("screen").width;
const widthOfTheViewOfTheLoader = widthOfScreen - widthOfScreen * 0.15 * 2;
console.log(widthOfTheViewOfTheLoader);

export default function SplashScreen() {
  const navigation = useNavigation();


  const width = useSharedValue(20); // Initial width value
  const opacity = useSharedValue(0); // Initial opacity value
  const translateX = useSharedValue(0); // Initial translate
  const WidthOfTheLoader = useSharedValue(0.12 * widthOfTheViewOfTheLoader); // Initial width

  // Define the animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(width.value, { duration: 1500 }), // Animate to the current width value
    };
  });

  const animatedStyleForLoader = useAnimatedStyle(() => {
    return {
      width: WidthOfTheLoader.value, // Animate to the current width value
    };
  });

  const animatedStyleForChevron = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }], // Animate to the current translateX value
    };
  });

  const animatedStyleForSubheading = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 2500 }), // Animate to opacity 1
    };
  });

  // Update the width after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      width.value = 210; // Set the final width value to animate to
      opacity.value = 1;
    }, 500); // Delay of 500 milliseconds

    return () => clearTimeout(timer);
  }, []);

  const navigateToNextScreen = () => {
    setTimeout(()=>{navigation.navigate('HomeScreen')}, 1000)
    

  }

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0 && event.translationX <= 260) {
        console.log("Swiping right"); // Right slide detected
        console.log(event.translationX);
        translateX.value = event.translationX;
        WidthOfTheLoader.value =
          event.translationX + 0.11 * widthOfTheViewOfTheLoader;

        // Handle the right slide here
      } else if (event.translationX < 0) {
        console.log("Swiping left"); // Left slide detected
        // Handle the left slide here
      }
    })
    .onEnd((event) => {
      if (translateX.value > 230) {
        console.log("the end");
        runOnJS(navigateToNextScreen)();

        // setTimeout(()=>{navigateToNextScreen}, 500)
      } else {
        console.log("Gesture ended");
        translateX.value = withSpring(0, { mass: 0.75 });
        WidthOfTheLoader.value = withSpring(0.12 * widthOfTheViewOfTheLoader);
      }
    });

  return (
    <View style={styleForSplashScreen.container}>
      <View style={styleForSplashScreen.forUpperPortion}>
        <LottieView
          source={{
            uri: "https://lottie.host/3607d8b9-52fe-4a0e-be54-8d71cf2e76c3/owxGYai240.json",
          }} // Path to your Lottie JSON file
          autoPlay
          loop
          // speed={0.5}
          style={styleForSplashScreen.animationOfBook}
        />
        <View style={styleForSplashScreen.viewForIconAndNameOfApp}>
          <Text style={styleForSplashScreen.mainHeadingText}>Inked</Text>
        </View>
        <Animated.View
          style={[styleForSplashScreen.lineBelowText, animatedStyle]}
        ></Animated.View>
        <Animated.Text
          style={[styleForSplashScreen.subheading, animatedStyleForSubheading]}
        >
          Your Blog Companion
        </Animated.Text>
      </View>
      <View style={styleForSplashScreen.viewForTheLowerPotion}>
        <GestureDetector gesture={panGesture}>
          <View style={styleForSplashScreen.styleForTheSliderContainer}>
            <Animated.View
              style={[
                styleForSplashScreen.loaderBehindTheIcon,
                animatedStyleForLoader,
              ]}
            ></Animated.View>
            <Animated.View style={[animatedStyleForChevron]}>
              <ChevronRight stroke={"white"} />
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

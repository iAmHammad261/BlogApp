# Inked, A blogging app

A simple Blog App, created using Expo, that lets user create a blog and then view it.

## Features of app

The app has following features: 
1) Creation of blog is handled by the react-native-rich-editor library.
2) Rendering of the blog is done through react-native-render-html library. 
3) Storing of data is handled by react-native-MMKV library. 
4) Splash screen make use of LOTTIE animation, and react-native-gesture-handler to enable the swipe capturing. (Instead of being at native layer, splash screen is at JS layer)


## Preview

https://github.com/user-attachments/assets/9fecea3d-b963-4bf7-b8e9-852361e180be

## Installation guide 
### Clone the repo 
```bash
git clone https://github.com/iAmHammad261/BlogApp
```
### Install required libraries:
```bash
npx expo install
```
### Build the project to run it:
```bash
npx expo run:android
```

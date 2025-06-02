/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
//import {moderateScale} from '../utils/ResponsiveUi';
export const SKELETON_SPEED = 1500;
export const SKELETON_BG = '#dddddd';
export const SKELETON_HIGHLIGHT = '#e7e7e7';
export const MAX_RATING_DEVIATION = 200;
const {width, height} = Dimensions.get('window');

const ProfileSkelton = () => (
  <SkeletonPlaceholder
    speed={SKELETON_SPEED}
    backgroundColor={SKELETON_BG}
    highlightColor={SKELETON_HIGHLIGHT}>
    <View style={{flexDirection: 'row'}}>
      {/* <View style={styles.skeltonImageView} /> */}
      <View style={[styles.skeltonMainView, {top: 15}]} />
    </View>
    {/* <View
      style={[
        styles.skeltonChangePasswordView,
        {top: 30, height: height * 0.06},
      ]}
    /> */}
    {/* <View
      style={[
        styles.skeltonMainView,
        {
          width: width * 0.95,
          height: height * 0.06,
          top: 250,
          borderRadius: 25,
        },
      ]}
    /> */}
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  // skeltonImageView: {
  //   width: width / 5,
  //   margin: 8,
  //   borderWidth: 0,
  //   borderRadius: 50,
  //   height: height / 11,
  // },
  skeltonMainView: {
    width: width / 1.4,
    margin: 8,
    borderWidth: 0,
    height: height / 16,
    elevation: 5,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {height: 0, width: 0},
    borderRadius: 5,
    // height: globals.screenHeight * 0.24,
  },
  // skeltonChangePasswordView: {
  //   width: '96%',
  //   margin: 8,
  //   borderWidth: 0,
  //   borderRadius: 5,
  //   height: height * 0.13,
  //   elevation: 5,
  //   shadowOpacity: 0.6,
  //   shadowRadius: 5,
  //   shadowOffset: {height: 0, width: 0},
  // },
});

export default ProfileSkelton;

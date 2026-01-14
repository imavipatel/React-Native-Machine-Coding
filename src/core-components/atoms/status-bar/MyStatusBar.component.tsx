// import { useTheme } from '@themes';
import React from 'react';
import { StatusBar } from 'react-native';

const MyStatusBar = () => {
  // const { appTheme, dark } = useTheme();

  // const getBarStyle = () => {
  //   return dark ? 'light-content' : 'dark-content';
  // };
  return (
    <StatusBar
      animated
      backgroundColor={
        '#F2F2F4'
        // props.isOverlay ? appTheme.overlay : appTheme.Neutrals100
      }
    />
  );
};

export default MyStatusBar;

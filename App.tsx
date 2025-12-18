/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  const onPressButton = () => {
    console.log('hello');
    console.log(isDarkMode);
    Alert.alert('Button Pressed', `Dark mode: ${isDarkMode}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity onPress={() => onPressButton()}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

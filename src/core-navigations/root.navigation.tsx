import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultRoot from '@core-navigations/default-navigation';

export const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <SafeAreaView style={Styles.flexStyle}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="dashboardHomeStack">
          {defaultRoot?.map(route => (
            <Stack.Screen
              key={route?.name}
              name={route?.name}
              component={route?.component}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigation;

const Styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },
});

import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MachineCodingDashboardStyles as Styles } from '@modules/machine-coding/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface MachineCodingDashboardProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}

export const MachineCodingDashboard = ({
  navigation,
}: MachineCodingDashboardProps) => {
  return (
    <SafeAreaView style={Styles.container}>
      <Text
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go Back
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('pincode-api-integration');
        }}
      >
        Pincode Api Integration
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('restaurants-list-filter-api-integration');
        }}
      >
        Restaurants List Api Integration
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('todo-application-add-edit-delete');
        }}
      >
        Todo Application Add Edit Delete
      </Text>
    </SafeAreaView>
  );
};

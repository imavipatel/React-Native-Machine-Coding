import React from 'react';
import { Text, View } from 'react-native';
import { RestaurantListFilterApiIntegrationStyle as Styles } from '@modules/machine-coding/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface MachineCodingDashboardProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}
export const RestaurantsListFilterApiIntegration = ({
  navigation,
}: MachineCodingDashboardProps) => {
  return (
    <View style={Styles.container}>
      <Text
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go Back
      </Text>
      <Text>Restaurant List Filter Apin Integration</Text>
    </View>
  );
};

import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PincodeApiIntegrationStyle as Styles } from '@modules/machine-coding/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface PinCodeApiIntegrationProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}

export const PinCodeApiIntegration = ({
  navigation,
}: PinCodeApiIntegrationProps) => {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={Styles.container}>
      <Text
        onPress={() => {
          navigation.goBack();
        }}
      >
        Go Back
      </Text>

      <Text>Pin Code API Integration Hello</Text>
    </SafeAreaView>
  );
};

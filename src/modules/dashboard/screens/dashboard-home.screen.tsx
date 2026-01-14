import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardHomeStyles as Styles } from '@modules/dashboard/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { MyStatusBar } from '@core-components/atoms';

interface DashboardHomeProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}

export const DashboardHomeScreen = (props: DashboardHomeProps) => {
  return (
    <SafeAreaView style={Styles.container}>
      <MyStatusBar />
      <Text>Dashboard</Text>
      <Text
        onPress={() => {
          props.navigation.navigate('machineCodingStack');
        }}
      >
        Machine Coding Dashboard Home
      </Text>
    </SafeAreaView>
  );
};

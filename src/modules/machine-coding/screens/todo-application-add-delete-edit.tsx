import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TodoApplicationAddDeleteEditStyles as Styles } from '@modules/machine-coding/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { NavBar } from '@core-components/molecules';

interface MachineCodingDashboardProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}

export const TodoApplicationAddDeleteEdit = ({
  navigation,
}: MachineCodingDashboardProps) => {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={Styles.flex}>
      <NavBar
        title={'To Do Application'}
        onPressGoBack={() => navigation.goBack()}
      />
      <View style={Styles.container}>
        <Text>To do applicatioin</Text>
      </View>
    </SafeAreaView>
  );
};

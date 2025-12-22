import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TodoApplicationAddDeleteEditStyles as Styles } from '@modules/machine-coding/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface MachineCodingDashboardProps {
  navigation: NavigationProp<ParamListBase>;
  route: Record<string, any | undefined>;
}

export const TodoApplicationAddDeleteEdit = ({
  navigation,
}: MachineCodingDashboardProps) => {
  const NavBar = () => {
    return (
      <View
        style={{
          height: '8%',
          backgroundColor: 'green',
          paddingHorizontal: 16,
          justifyContent: 'center',
        }}
      >
        <Text>To Do Application</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.flex}>
      <NavBar />
      <View style={Styles.container}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
        >
          Go Back
        </Text>
        <Text>To do applicatioin</Text>
      </View>
    </SafeAreaView>
  );
};

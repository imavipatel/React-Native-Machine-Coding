import { Text, View } from 'react-native';
import { NavBarStyles as Styles } from './NavBar.styles';

interface NavBarProps {
  title: string;
  onPressGoBack: () => void;
}

export const NavBar = ({ title, onPressGoBack }: NavBarProps) => {
  return (
    <View style={Styles.container}>
      <Text onPress={onPressGoBack}>Go Back</Text>
      <Text style={Styles.titleStyle}>{title ?? 'Title'}</Text>
    </View>
  );
};

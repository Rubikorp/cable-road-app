import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    "Auth": undefined;
    "Main": undefined;
    "AddEditPoleScreen": undefined;
    "RepairsListScreen": undefined;  
  };

type MainNavigationProp = StackNavigationProp<RootStackParamList>;

export interface PropsNavigation {
  navigation: MainNavigationProp;
}
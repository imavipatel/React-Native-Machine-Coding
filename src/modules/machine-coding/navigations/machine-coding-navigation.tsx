import React from 'react';
import {
  PinCodeApiIntegration,
  RestaurantsListFilterApiIntegration,
  MachineCodingDashboard,
} from '@modules/machine-coding/screens';
import { Stack } from '@core-navigations/root.navigation';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export function MachineCodingStack() {
  const machineCodingRoutes: Array<{
    name: string;
    component: any;
    screenId: string;
    headerTitle?: string;
    options?: NativeStackNavigationOptions;
  }> = [
    {
      name: 'machine-coding-dashboard',
      component: MachineCodingDashboard,
      screenId: 'MACN-CODN-DSH-BORD',
    },
    {
      name: 'pincode-api-integration',
      component: PinCodeApiIntegration,
      screenId: 'PINCODE-API-INTE-GRTN',
    },
    {
      name: 'restaurants-list-filter-api-integration',
      component: RestaurantsListFilterApiIntegration,
      screenId: 'REST-RENT-LIST-FILTER',
    },
  ];
  return (
    <Stack.Navigator initialRouteName="machine-coding-dashboard">
      {machineCodingRoutes?.map(route => {
        return (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
}

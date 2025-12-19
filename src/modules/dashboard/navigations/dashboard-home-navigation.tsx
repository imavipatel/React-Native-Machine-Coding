import React from 'react';
import { Stack } from '@core-navigations/root.navigation';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { DashboardHomeScreen } from '@modules/dashboard/screens';

export function DashboardHomeStack() {
  const dashboardRoutes: Array<{
    name: string;
    component: any;
    screenId: string;
    headerTitle?: string;
    options?: NativeStackNavigationOptions;
  }> = [
    {
      name: 'dashboard-home-screen',
      component: DashboardHomeScreen,
      screenId: 'DSH-BORD-HOME-SCRN',
    },
  ];
  return (
    <Stack.Navigator initialRouteName="dashboard-home-screen">
      {dashboardRoutes?.map(route => {
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

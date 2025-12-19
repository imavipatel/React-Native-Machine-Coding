import { DashboardHomeStack } from '@modules/dashboard/navigations';
import { MachineCodingStack } from '@modules/machine-coding/navigations';

const defaultRoot = [
  {
    name: 'dashboardHomeStack',
    component: DashboardHomeStack,
  },
  {
    name: 'machineCodingStack',
    component: MachineCodingStack,
  },
];

export default defaultRoot;

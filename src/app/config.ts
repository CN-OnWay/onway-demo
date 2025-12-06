import {
  AppWindow,
  ClipboardList,
  KeySquare,
  Settings2,
  Map,
} from 'lucide-react';
import ava from '@/app/imgs/ava.avif';
import companyImg from '@/app/favicon.ico';

export const navigation = {
  user: {
    name: 'Admin',
    email: 'admin@example.com',
    avatar: ava,
  },
  teams: [
    {
      name: 'Company Name',
      logo: companyImg,
      plan: 'No limints',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: AppWindow,
      isActive: true,
      items: [
        {
          title: 'Analytics',
          url: '/',
        },
        {
          title: 'Export',
          url: '/dashboard/export',
        },
      ],
    },
    {
      title: 'Requests',
      url: '/requests/list',
      icon: ClipboardList,
    },
    {
      title: 'Routes',
      url: '/routes',
      icon: Map,
    },
    {
      title: 'Autopark',
      url: '#',
      icon: KeySquare,
      items: [
        {
          title: 'Cars',
          url: '/autopark/cars',
        },
        {
          title: 'Drivers',
          url: '/autopark/drivers',
        },
        {
          title: 'Map',
          url: '/autopark/map',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '/settings/general',
        },
        {
          title: 'Integrations',
          url: '/settings/integrations',
        },
      ],
    },
  ],
};

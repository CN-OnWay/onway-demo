'use client';

import * as React from 'react';

import { NavMain } from '../Nav/index';
import { NavUser } from '../Nav/nav-user';
import { TeamSwitcher } from '../Nav/team-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { navigation } from '@/app/config';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigation.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigation.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigation.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

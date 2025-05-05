import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { DashboardSidebar } from '@/layouts/dashboard/dashboard-sidebar';

const DashboardLayout = ({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) => <AppShell variant="sidebar">
    <DashboardSidebar/>
    <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
    </AppContent>
</AppShell>

export default DashboardLayout

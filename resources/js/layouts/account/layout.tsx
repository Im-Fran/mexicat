import { AppSidebarHeader, AppShell, AppContent } from '@/layouts/app-layout';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { KeyIcon, MapPinIcon, PackageIcon, UserIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const accountNavItems: NavItem[] = [
    {
        title: 'Perfil',
        href: route('account.index'),
        icon: UserIcon,
    },
    {
        title: 'Seguridad',
        href: route('account.security'),
        icon: KeyIcon,
    },
    {
        title: 'Direcciones',
        href: route('account.addresses'),
        icon: MapPinIcon,
    },
    {
        title: 'Ordenes Pasadas',
        href: route('account.orders'),
        icon: PackageIcon,
    },
];

export const AccountSidebar = () => (
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild>
                        <Link href={route('home')} prefetch>
                            <img src="/images/logo.png" alt="Mexicat Logo" className="h-8 w-8 rounded-full border-2 shadow-sm" />
                            <span className="ml-2 text-lg font-bold">Mexicat</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <nav className="space-y-1">
                {accountNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <SidebarMenu key={item.href}>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href} prefetch>
                                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    );
                })}
            </nav>
        </SidebarContent>

        <SidebarFooter />
    </Sidebar>
);

const AccountLayout = ({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) => (
    <AppShell variant="sidebar">
        <AccountSidebar />
        <AppContent variant="sidebar">
            <AppSidebarHeader breadcrumbs={breadcrumbs} />
            <div className={'p-5'}>{children}</div>
        </AppContent>
    </AppShell>
);

export default AccountLayout;

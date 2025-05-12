import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BoxIcon, Folder, LayoutGrid, UsersIcon } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard.overview'),
        icon: LayoutGrid,
    },
    {
        title: 'Productos',
        href: route('dashboard.products.index'),
        icon: BoxIcon,
    },
    {
        title: 'Clientes',
        href: route('dashboard.customers.index'),
        icon: UsersIcon,
    },
    {
        title: 'Roles',
        href: route('dashboard.roles.index'),
        icon: Folder,
    },
    {
        title: 'Permisos',
        href: route('dashboard.permissions.index'),
        icon: BookOpen,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export const DashboardSidebar = () => <Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <Link href={route('dashboard.overview')} prefetch>
                        <img
                            src={"/images/logo.webp"}
                            alt="Mexicat Logo"
                            className="h-10 w-auto rounded-xl"
                        />

                        <span className="ml-2 text-lg font-bold">Mexicat</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
        <NavMain items={mainNavItems} />
    </SidebarContent>

    <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
    </SidebarFooter>
</Sidebar>;

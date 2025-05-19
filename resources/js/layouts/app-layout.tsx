import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import FlashMessages from '@/components/flash-messages';
import { ComponentProps, ReactNode } from 'react';
import * as React from 'react';

export const AppSidebarHeader = ({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) => (
    <header
        className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
    </header>
);

interface AppShellProps {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
}
export const AppShell = ({ children, variant = 'header' }: AppShellProps) => {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">
            {children}
            <Toaster/>
            <FlashMessages/>
        </div>;
    }

    return <SidebarProvider defaultOpen={isOpen}>
        {children}
        <Toaster/>
        <FlashMessages/>
    </SidebarProvider>;
};

interface AppContentProps extends ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}
export const AppContent = ({ variant = 'header', children, ...props }: AppContentProps) => {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {children}
        </main>
    );
};

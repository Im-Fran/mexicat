import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { Badge } from '@/components/ui/badge';
import { usePermissions } from '@/hooks/use-permissions';
import { SharedData } from '@/types';
import { SiInstagram } from '@icons-pack/react-simple-icons';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, UserIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

export const GuestLayout = ({ children }: PropsWithChildren) => {
    const { auth } = usePage<SharedData>().props;
    const { hasPermission } = usePermissions();

    return (
        <AppShell>
            {/* Nav Bar */}
            <div className="border-b-foreground flex w-full border-b py-5">
                <div className="container mx-auto flex justify-between">
                    <Link className="text-primary flex items-center justify-center gap-4" href={route('home')}>
                        <img src={'/images/logo.webp'} alt={'Mexicat Market'} className={'h-12 w-12 rounded-full'} />
                        <h1 className={'text-primary text-xl font-semibold'}>Mexicat Market</h1>
                    </Link>

                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-end gap-4">
                            <Link href={route('home')}>Inicio</Link>
                            <Link href={route('products.index')}>Productos</Link>
                            {hasPermission('admin.dashboard.overview') && (
                                <Link href={route('dashboard.overview')}>Panel de Control</Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href={'https://instagram.com/mexicat_market?utm_src=mexicat'} target={'_blank'}>
                            <Badge className={'bg-primary text-primary-foreground'}>
                                <SiInstagram className={'h-4 w-4'} /> mexicat_market
                            </Badge>
                        </a>

                        {auth.user ? (
                            <Link href={route('logout')} method={'post'}>
                                <LogOut className={'w-6'} />
                            </Link>
                        ) : (
                            <Link href={route('login')}>
                                <UserIcon className={'w-6'} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <AppContent>
                {children}
            </AppContent>
        </AppShell>
    );
};

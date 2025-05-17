import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TooltipContent, Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { GuestLayout } from '@/layouts/guest/guest-layout';

const Home = () =>  {
    return <GuestLayout>
        <Head title={"Home"}/>

        <div className={"flex-1 flex flex-col items-start justify-center container mx-auto"}>
            <h1 className={"text-4xl font-bold text-left mb-4"}>Dulces del Mundo en<br/><span className={"text-primary"}>Chile</span></h1>
            <p className={"text-lg text-left mb-4 max-w-lg"}>En Mexicat Market encontrarás los mejores dulces importados de México y del mundo entero. ¡Sabores únicos que te transportarán a otros países!</p>

            <div className={"flex items-center justify-center gap-4"}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={'#'}>
                                <Button>
                                    Ver Productos
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className={"text-sm text-center"}>Próximamente</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <a href={"https://instagram.com/mexicat_market?utm_src=mexicat"} target={"_blank"}>
                    <Button variant={"secondary"}>
                        Seguir en Instagram <ArrowRight className={"w-4 h-4"}/>
                    </Button>
                </a>
            </div>

            <div className={"flex items-center justify-center mt-15 w-full"}>
                <Card className={"flex items-center justify-center bg-primary text-primary-foreground p-5"}>
                    <div className={"flex flex-col items-center justify-center"}>
                        <h2 className={"text-2xl font-bold"}>+100</h2>
                        <p className={"text-sm text-center"}>Productos diferentes</p>
                    </div>
                </Card>

                <Card className={"flex items-center justify-center bg-primary text-primary-foreground p-5 ml-4"}>
                    <div className={"flex flex-col items-center justify-center"}>
                        <h2 className={"text-2xl font-bold"}>+8</h2>
                        <p className={"text-sm text-center"}>Países de origen</p>
                    </div>
                </Card>

                <Card className={"flex items-center justify-center bg-primary text-primary-foreground p-5 ml-4"}>
                    <div className={"flex flex-col items-center justify-center"}>
                        <h2 className={"text-2xl font-bold"}>Envíos</h2>
                        <p className={"text-sm text-center"}>A todo Chile</p>
                    </div>
                </Card>
            </div>
        </div>
    </GuestLayout>
}

export default Home;

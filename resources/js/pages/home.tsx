import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { SiInstagram } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TooltipContent, Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';

const Home = () =>  <>
    <Head title={"Home"}/>

    <div className="flex min-h-screen flex-col">
        {/* Nav Bar */}
        <div className="flex py-5 border-b border-b-foreground w-full">
            <div className={"flex justify-between container mx-auto"}>
                <Link className={"flex items-center justify-center text-primary gap-4"} href={route('home')}>
                    <img
                        src={"/images/logo.webp"}
                        alt={"Mexicat Market"}
                        className={"rounded-full w-12 h-12"}
                    />

                    <h1 className={"text-primary text-xl font-semibold"}>Mexicat Market</h1>
                </Link>

                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('home')}>
                            Inicio
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <a href={"https://instagram.com/mexicat_market?utm_src=mexicat"} target={"_blank"}>
                        <Badge className={"bg-primary text-primary-foreground"}>
                            <SiInstagram className={"w-4 h-4"}/> mexicat_market
                        </Badge>
                    </a>
                </div>
            </div>
        </div>

        {/* Main Content */}
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
    </div>
</>

export default Home;

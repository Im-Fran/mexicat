import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type ErrorMessage = {
    title: string;
    message: string;
    codes?: number[];
}

const messages: ErrorMessage[] = [
    { title: 'Error desconocido', message: 'Lo sentimos, ha ocurrido un error desconocido.', codes: [0] },

    { title: 'Error de redirección', message: 'Lo sentimos, ha ocurrido un error de redirección.', codes: [300] },
    { title: 'Error de autenticación', message: 'Lo sentimos, no estás autenticado para acceder a esta página.', codes: [401] },
    { title: 'Pago requerido', message: 'Lo sentimos, se requiere un pago para acceder a esta página.', codes: [402] },
    { title: 'Error de autorización', message: 'Lo sentimos, no estás autorizado para acceder a esta página.', codes: [403] },
    { title: 'Página no encontrada', message: 'Lo sentimos, la página que estás buscando no existe.', codes: [404] },
    { title: 'Método no permitido', message: 'Lo sentimos, el método que estás utilizando no está permitido.', codes: [405] },
    { title: 'No aceptable', message: 'Lo sentimos, el contenido que estás buscando no está disponible en el formato solicitado.', codes: [406] },
    { title: 'Tiempo de espera agotado', message: 'Lo sentimos, la solicitud ha tardado demasiado tiempo en completarse.', codes: [408] },
    { title: 'Conflicto', message: 'Lo sentimos, ha ocurrido un conflicto con la solicitud.', codes: [409] },
    { title: 'Error de validación', message: 'Lo sentimos, ha ocurrido un error de validación.', codes: [422] },
    { title: 'Error interno del servidor', message: 'Lo sentimos, ha ocurrido un error interno en el servidor.', codes: [500] },
    { title: 'Error no implementado', message: 'Lo sentimos, la funcionalidad solicitada no está implementada.', codes: [501] },
    { title: 'Servicio no disponible', message: 'Lo sentimos, el servicio solicitado no está disponible.', codes: [503] },
    { title: 'Puerta de enlace no válida', message: 'Lo sentimos, ha ocurrido un error de puerta de enlace.', codes: [502] },
    { title: 'Tiempo de espera de puerta de enlace agotado', message: 'Lo sentimos, el tiempo de espera de puerta de enlace ha sido superado.', codes: [504] },
]

type ErrorProps = {
    code: number;
    ip?: string;
}

const Error = ({ code, ip }: ErrorProps) => {
    const errorMessage = messages.find((message) => message.codes?.includes(code)) || messages[0];

    return <>
        <div className={'flex h-screen flex-col items-center justify-center'}>
            <h1 className={'text-primary text-4xl font-bold'}>{errorMessage.title}</h1>
            <p className={'text-lg'}>{errorMessage.message}</p>

            <div className={'mt-4 text-sm text-muted-foreground text-center'}>
                <p>Código de error: <span className={'text-foreground'}>{code === 0 ? 'Desconocido' : code}</span></p>
                <p>Por favor, contacta al soporte técnico si el problema persiste.</p>
            </div>

            <Link href={route('home')}>
                <Button variant={"link"}>
                    Volver al Inicio
                </Button>
            </Link>
        </div>

        <div className={'absolute bottom-0 left-0 right-0 flex items-center justify-center p-4'}>
            <p className={'text-sm text-muted-foreground'}>Tu IP: <b>{ip}</b> - Fecha: <b>{new Date().toLocaleString()}</b></p>
        </div>
    </>;
}

export default Error;

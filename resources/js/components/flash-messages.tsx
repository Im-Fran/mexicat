import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { SharedData } from '@/types';

const FlashMessages = () => {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return null;
}

export default FlashMessages;

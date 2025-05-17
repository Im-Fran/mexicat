import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const currency = (value: number, currency: string = 'CLP') => value.toLocaleString('es-CL', {
    style: 'currency',
    currency,
});

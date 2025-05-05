import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';

export type ConfirmationButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    dialogTitle?: string;
    confirmMessage?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const ConfirmationButton = ({ className, dialogTitle = "Confirmación", confirmMessage: dialogMessage = "Estás seguro de que quieres continuar?", confirmButtonText = "Confirmar", cancelButtonText = "Cancelar", onConfirm, onCancel, variant, size, asChild = false, ...rest }: ConfirmationButtonProps) => {
    const Comp = asChild ? 'span' : 'button';
    const [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        setOpen(false);
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) handleCancel();
            }}
        >
            <DialogTrigger asChild>
                <Comp data-slot="confirmation-button" className={buttonVariants({ variant, size, className })} {...rest} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                <DialogDescription>{dialogMessage}</DialogDescription>
                <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={handleCancel}>
                        {cancelButtonText}
                    </Button>
                    <Button variant={variant || 'default'} onClick={handleConfirm}>
                        {confirmButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmationButton;

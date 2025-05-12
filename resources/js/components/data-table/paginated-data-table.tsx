import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedResponse } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: PaginatedResponse<TData>
}

export function PaginatedDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data: data.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return <div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
                <Link href={data.first_page_url || '#'} prefetch>
                    <Button variant={'outline'}>
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <Link href={data.prev_page_url || '#'} prefetch>
                    <Button variant={'outline'}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            <span className="text-sm text-muted-foreground">
                Página {data.current_page} de {data.last_page}
            </span>

            <div className="flex items-center space-x-2">
                <Link href={data.next_page_url || '#'} prefetch>
                    <Button variant={'outline'}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </Link>
                <Link href={data.last_page_url || '#'} prefetch>
                    <Button variant={'outline'}>
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    </div>;
}

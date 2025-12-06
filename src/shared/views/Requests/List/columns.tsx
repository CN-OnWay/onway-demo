import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Request } from '@/shared/api/requests/types';

export const columns: ColumnDef<Request>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as {
        _seconds: number;
        _nanoseconds: number;
      };
      const dateString = date
        ? new Date(date._seconds * 1000).toLocaleDateString()
        : '';
      return <div>{dateString}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'pickUpAirport',
    header: 'Pick-Up Airport',
    cell: ({ row }) => <div>{row.getValue('pickUpAirport')}</div>,
  },
  {
    accessorKey: 'dropOffLocation',
    header: 'Drop-Off Location',
    cell: ({ row }) => <div>{row.getValue('dropOffLocation')}</div>,
  },
  {
    accessorKey: 'pickUpDate',
    header: 'Pick-Up Date',
    cell: ({ row }) => {
      const pickUpDate = row.getValue('pickUpDate') as {
        _seconds: number;
        _nanoseconds: number;
      };
      const dateString = pickUpDate
        ? new Date(pickUpDate._seconds * 1000).toLocaleDateString()
        : '';
      return <div>{dateString}</div>;
    },
  },
  {
    accessorKey: 'pickUpTime',
    header: 'Pick-Up Time',
    cell: ({ row }) => {
      const pickUpTime = row.getValue('pickUpTime') as string[];
      const timeString =
        pickUpTime && pickUpTime.length >= 3
          ? `${pickUpTime[0]}:${pickUpTime[1]} ${pickUpTime[2]}`
          : '';
      return <div>{timeString}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy transfer ID
            </DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Approve</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

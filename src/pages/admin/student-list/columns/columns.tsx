import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types/students';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span>{row.getValue('id')}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.getValue('email')}</span>,
  },
  {
    accessorKey: 'major',
    header: 'Ngành học',
    cell: ({ row }) => <span>{row.getValue('major')}</span>,
  },
  {
    accessorKey: 'specialization',
    header: 'Chuyên ngành',
    cell: ({ row }) => <span>{row.getValue('specialization')}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          className={
            status === 'active'
              ? 'bg-green-100 text-green-500'
              : 'bg-red-100 text-red-500'
          }
        >
          {status}
        </Badge>
      );
    },
  },
];

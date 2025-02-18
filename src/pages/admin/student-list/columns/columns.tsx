import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/lib/api/types';

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
    accessorKey: 'student_code',
    header: 'Mã sinh viên', 
    cell: ({ row }) => <span>{row.getValue('student_code')}</span>,
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
  // {
  //   accessorKey: 'programming_language',
  //   header: 'Ngôn ngữ',
  //   cell: ({ row }) => <span>{row.getValue('programming_language')}</span>,
  // },
  {
    accessorKey: 'qualificationStatus',
    header: 'Điều kiện',
    cell: ({ row }) => {
      const status = row.getValue('qualificationStatus') as string;
      return (
        <Badge
          className={
            status === 'qualified'
              ? 'bg-green-100 text-green-500'
              : 'bg-red-100 text-red-500'
          }
        >
          {status}
        </Badge>
      );
    },
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

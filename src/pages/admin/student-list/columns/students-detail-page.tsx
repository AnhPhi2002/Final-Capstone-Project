import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsBySemester } from '@/lib/api/redux/studentSlice';
import { RootState, AppDispatch } from '@/lib/api/redux/store';
import { columns } from './columns';
import { DataTable } from './data-table';
import Header from '@/components/header';
import ToolPanel from './tool-panel'; // Import ToolPanel

export const StudentsDetailPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentsBySemester(studentId));
    }
  }, [dispatch, studentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Error: {error}</h1>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Không tìm thấy sinh viên</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Danh sách sinh viên" href="/" currentPage="Chi tiết danh sách sinh viên trong kỳ" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel /> {/* Thêm ToolPanel ở đây */}
        <DataTable columns={columns} data={students} />
      </div>
    </div>
  );
};

import Header from '@/components/header'
import { SelectSemester } from './select-semester'



export const NotGroupStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="tổng quan " href="/" currentPage="D.s chưa có nhóm KLTN " />
      <div className="p-5 flex-1 overflow-auto">
        {/* Sử dụng flex để bố cục ngang */}
        <div className="flex justify-between items-start">
          <SelectSemester />
          
       
          
        </div>
      </div>
    </div>
  )
}

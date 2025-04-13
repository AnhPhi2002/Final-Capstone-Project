import Header from '@/components/header'; // Giả định bạn có component Header
import ProgressReportList from './ProgressReportList';
import ProgressReportForm from './ProgressReportForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const ProgressReportPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Báo cáo tiến độ" href="/" currentPage="Quản lý báo cáo tiến độ" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Viết báo cáo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Tạo báo cáo tiến độ</DialogTitle>
              </DialogHeader>
              <ProgressReportForm onCancel={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <ProgressReportList />
      </div>
    </div>
  );
};

export default ProgressReportPage;
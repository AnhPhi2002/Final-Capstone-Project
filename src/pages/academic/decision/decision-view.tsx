'use client';

import { Card, CardContent } from '@/components/ui/card';
import { RootState } from '@/lib/api/redux/store';
import { useSelector } from 'react-redux';
import { DataTable } from './columns/data-table';
import { columns } from './columns/columns';
import { format } from 'date-fns';
import Header from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu } from './columns/menu';

export const DecisionView = () => {
  const { mentors } = useSelector((state: RootState) => state.mentors);
  const { decisions } = useSelector((state: RootState) => state.decision);
  const { draftFile, finalFile } = useSelector((state: RootState) => state.uploadDecision);

  const latestDecision = decisions.length > 0 ? decisions[0] : null;

  if (!latestDecision) {
    return (
      <div>
        <Header
          title="Xem quyết định"
          href="/"
          currentPage="Xem quyết định"
        />
        <div className="max-w-6xl mx-auto p-8">
          <p className="text-center">Không tìm thấy quyết định cho học kỳ này.</p>
        </div>
      </div>
    );
  }

  const textClass = 'text-[14.5pt] font-times leading-[1.5]';

  return (
    <div>
      <Header
        title="Xem quyết định"
        href="/"
        currentPage={`Xem quyết định học kỳ ${latestDecision.semesterId}`}
      />
<div className="max-w-6xl mx-auto px-8 mt-4">
        <div className="flex items-center gap-6 flex-wrap">
          {/* Loại quyết định badge */}
          <div className="flex items-center gap-2">
            <span className="font-bold whitespace-nowrap">Bảng:</span>
            <Badge
              variant={latestDecision.type === 'DRAFT' ? 'default' : 'secondary'}
              className={
                latestDecision.type === 'DRAFT'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-green-500 text-white'
              }
            >
              {latestDecision.type === 'DRAFT' ? 'Nháp' : 'Chính thức'}
            </Badge>
          </div>

          {/* Hiển thị decisionURL nếu có */}
          {latestDecision.decisionURL && (
            <div className="flex items-center gap-2">
              <span className="font-bold whitespace-nowrap">File quyết định:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => latestDecision.decisionURL && window.open(latestDecision.decisionURL, '_blank')}
              >
                {draftFile?.fileName || finalFile?.fileName || 'Tải file quyết định'}
              </Button>
            </div>
          )}

          {/* Hiển thị draftFile hoặc finalFile nếu không có decisionURL */}
          {!latestDecision.decisionURL && (
            <>
              {(latestDecision.type === 'DRAFT' && draftFile?.fileUrl) && (
                <div className="flex items-center gap-2">
                  <span className="font-bold whitespace-nowrap">File nháp:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(draftFile.fileUrl, '_blank')}
                  >
                    {draftFile.fileName}
                  </Button>
                </div>
              )}
              {(latestDecision.type === 'FINAL' && finalFile?.fileUrl) && (
                <div className="flex items-center gap-2">
                  <span className="font-bold whitespace-nowrap">File chính thức:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(finalFile.fileUrl, '_blank')}
                  >
                    {finalFile.fileName}
                  </Button>
                </div>
              )}
            </>
          )}
             <Menu semesterId={latestDecision.semesterId} />
        </div>
     
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <Card className={`${textClass} shadow-lg`}>
          <CardContent className="p-10">
            <div className="flex justify-between uppercase">
              <div className="w-1/2">
                <p>TRƯỜNG ĐẠI HỌC FPT</p>
                <p className="font-bold">PHÂN HIỆU TRƯỜNG ĐẠI HỌC FPT</p>
                <p className="font-bold">TẠI TP. HỒ CHÍ MINH</p>
              </div>
              <div className="w-1/2 text-right">
                <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <p className="indent-[1.27cm]">
                Số: {latestDecision.decisionName}
              </p>
              <p className="italic pr-[0.9cm]">
                TP. Hồ Chí Minh, ngày{" "}
                {format(
                  new Date(latestDecision.decisionDate ?? new Date()),
                  "dd 'tháng' MM 'năm' yyyy"
                )}
              </p>
            </div>

            <div className="text-center mt-6">
              <h1 className="text-[14.5pt] font-bold uppercase">QUYẾT ĐỊNH</h1>
              <p className="mt-2 text-[14.5pt] font-bold">
                {latestDecision.decisionTitle}
              </p>
              <hr className="border-t border-black w-1/4 mx-auto mt-2" />
            </div>

            <div className="mt-6">
              <p className="font-bold text-center">
                HIỆU TRƯỞNG TRƯỜNG ĐẠI HỌC FPT
              </p>
              <div className="italic text-justify">
                <p className="mt-2 indent-[1.27cm]">
                  Căn cứ Quyết định số 208/QĐ-TTg ngày 08/9/2006 của Thủ tướng
                  Chính Phủ về việc thành lập Trường Đại học FPT;
                </p>
                {latestDecision.basedOn?.map((item, index) => (
                  <p key={index} className="mt-2 indent-[1.27cm]">
                    {item}
                  </p>
                ))}
                <p className="mt-2 indent-[1.27cm]">
                  {latestDecision.proposal}
                </p>
              </div>
            </div>

            <div>
              <p className="mt-6 font-bold text-center">QUYẾT ĐỊNH:</p>
              <p className="mt-2 indent-[1.27cm] text-justify">
                <span className="font-bold">Điều 1. </span>
                {latestDecision.content}
              </p>
            </div>

            <div className="mt-4">
              {mentors.length === 0 ? (
                <p className="text-center">Không có dữ liệu giảng viên</p>
              ) : (
                <DataTable columns={columns} data={mentors} />
              )}
              <p className="mt-2 text-justify">
                (Danh sách trên có {mentors.length} giảng viên hướng dẫn)
              </p>
            </div>

            <div>
              {latestDecision.clauses?.map((clause, index) => (
                <p key={index} className="mt-2 indent-[1.27cm] text-justify">
                  <span className="font-bold">Điều {index + 2}. </span>
                  {clause}
                </p>
              ))}
            </div>

   
            <div className="mt-8 flex justify-between">
              <div className="w-1/2 text-[13pt]">
                <p className="italic font-semibold">Nơi nhận:</p>
                <p>- Như Điều 4 (để t/h);</p>
                <p>- Lưu VT.</p>
              </div>
              <div className="w-1/3 text-center">
                <p className="font-bold uppercase">TUQ. HIỆU TRƯỞNG</p>
                <p className="font-bold uppercase">GIÁM ĐỐC</p>
                <p className="mt-28 font-bold">{latestDecision.signature}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DecisionView;
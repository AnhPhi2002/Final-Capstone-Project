// src/pages/DecisionView.tsx
import { Card, CardContent } from "@/components/ui/card"; 
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { RootState } from "@/lib/api/redux/store";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useParams } from "react-router";
import { DataTable } from "./columns/data-table"; 
import { columns } from "./columns/columns";
import { useAppDispatch } from "@/hooks/reduxHooks";

export const DecisionView = () => {
  const dispatch = useAppDispatch();

  const { semesterId } = useParams<{ semesterId: string }>();
  const { mentors, loading, error } = useSelector((state: RootState) => state.mentors);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchMentorsBySemesterId(semesterId) as any); // Type assertion may be needed
    }
  }, [dispatch, semesterId]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Card className="font-times text-[13pt] leading-[1.5] shadow-lg">
        <CardContent className="p-32">
          <div className="flex justify-between uppercase">
            <div className="w-1/2">
              <p>TRƯỜNG ĐẠI HỌC FPT</p>
              <p className="font-bold">PHÂN HIỆU TRƯỜNG ĐẠI HỌC FPT</p>
              <p className="font-bold">TẠI TP. HỒ CHÍ MINH</p>
            </div>
            <div className="w-1/2 t ext-right">
              <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between text-[14.5pt]">
            <p className="indent-[1.27cm]">Số: [keynum]/QĐ-FPTUHCM</p>
            <p className="italic pr-[0.9cm]">
              TP. Hồ Chí Minh, ngày [keyd] tháng [keym] năm [keyy]
            </p>
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-[14.5pt] font-bold uppercase">QUYẾT ĐỊNH</h1>
            <p className="mt-2 text-[14.5pt] font-bold">
              Về việc giao hướng dẫn khóa luận tốt nghiệp - học kỳ Spring 2025 Cơ sở Hồ Chí Minh
            </p>
            <p className="text-[14.5pt] font-bold">Cơ sở Hồ Chí Minh</p>
            <hr className="border-t border-black w-1/4 mx-auto mt-2" />
          </div>

          <div className="mt-6 text-[14.5pt]">
            <p className="font-bold text-center">
              HIỆU TRƯỞNG TRƯỜNG ĐẠI HỌC FPT
            </p>
            <div className="italic text-justify">
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 208/QĐ-TTg ngày 08/9/2006 của Thủ tướng
                Chính Phủ về việc thành lập Trường Đại học FPT;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Nghị định số 99/2019/NĐ-CP ngày 30/12/2019 của Chính Phủ
                về việc Quy định chi tiết và hướng dẫn thi hành một số điều của
                Luật sửa đổi, bổ sung một số điều của Luật Giáo dục đại học;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 1177/QĐ-ĐHFPT ngày 09/11/2023 của Chủ tịch
                Hội đồng trường Trường Đại học FPT về việc ban hành Quy chế tổ
                chức và hoạt động của Trường Đại học FPT;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 17/QĐ-BGDĐT ngày 02/01/2020 của Bộ Giáo dục
                và Đào tạo về việc cho phép thành lập Phân hiệu trường Đại học
                FPT tại TP.HCM;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 229/QĐ-BGDĐT ngày 31/01/2020 của Bộ Giáo
                dục và Đào tạo về việc cho phép Phân hiệu trường Đại học FPT tại
                TP.HCM tổ chức hoạt động đào tạo;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 15/QĐ-ĐHFPT ngày 06/01/2020 của Chủ tịch
                Hội đồng trường Trường Đại học FPT về việc ban hành Quy chế tổ
                chức và hoạt động của Phân hiệu Trường Đại học FPT tại TP.HCM;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 10/QĐ-ĐHFPT ngày 06/01/2016 của Hiệu trưởng
                trường Đại học FPT về Sửa đổi bổ sung một số Điều trong Quy định
                về tốt nghiệp đại học chính quy của Trường Đại học FPT;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 1494/QĐ-ĐHFPT ngày 31/12/2024 của Hiệu
                trưởng Trường Đại học FPT về việc phân công phê duyệt, ký văn
                bản tại các Khối/Viện/Trung tâm;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Căn cứ Quyết định số 842/QĐ-ĐHFPT ngày 12/08/2024 của Hiệu
                trưởng trường Đại học FPT về việc sửa đổi một số điều và ban
                hành Quy chế đào tạo Hệ đại học chính quy tại Trường Đại học
                FPT;
              </p>
              <p className="mt-2 indent-[1.27cm]">
                Theo đề nghị của Trưởng phòng TC&QL Đào tạo.
              </p>
            </div>
          </div>

          <div className="text-[14.5pt]">
            <p className="mt-6 font-bold text-center">QUYẾT ĐỊNH:</p>
            <p className="mt-2 indent-[1.27cm] text-justify">
              <span className="font-bold">Điều 1. </span> Giao nhiệm vụ cho các
              giảng viên có tên sau hướng dẫn sinh viên làm khóa luận tốt nghiệp
              - học kỳ Spring 2025 cơ sở Hồ Chí Minh (kèm theo danh sách sinh
              viên và đề tài).
            </p>
          </div>

          <div className="mt-4">
            {loading ? (
              <p className="text-center">Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="text-center text-red-500">Lỗi: {error}</p>
            ) : (
              <DataTable columns={columns} data={mentors} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionView;
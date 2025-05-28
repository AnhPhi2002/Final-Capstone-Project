"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { DataTable } from "./columns/data-table";
import { columns } from "./columns/columns";
import { format } from "date-fns";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { fetchDecisionsBySemesterId } from "@/lib/api/redux/decisionSlice";
import {
  fetchGuidanceList,
  selectGuidanceList,
} from "@/lib/api/redux/decisionListTopicSlice";
import DataTableList from "@/pages/academic/decision-list-top/columns/data-table";
import columnsList from "@/pages/academic/decision-list-top/columns/columns";

type DecisionViewProps = {
  semesterId: string; // Thêm prop semesterId
};

export const DecisionView = ({ semesterId }: DecisionViewProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    mentors,
    loading: mentorsLoading,
    error: mentorsError,
  } = useSelector((state: RootState) => state.mentors);
  const {
    decisions,
    loading: decisionsLoading,
    error: decisionsError,
  } = useSelector((state: RootState) => state.decision);

  // Lấy latestDecision dựa trên semesterId
  const latestDecision =
    decisions.find((d) => d.semesterId === semesterId) || null;

  const guidanceList = useSelector(selectGuidanceList);
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGuidanceList({ semesterId }));
    }
  }, [dispatch, semesterId]);
  // Fetch dữ liệu khi component mount
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchDecisionsBySemesterId(semesterId)); // Fetch decisions
      dispatch(fetchMentorsBySemesterId(semesterId)); // Fetch mentors
    }
  }, [dispatch, semesterId]);

  if (decisionsLoading || mentorsLoading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-center text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (decisionsError) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-center text-lg text-red-500">
          Lỗi: {decisionsError}
        </p>
      </div>
    );
  }

  if (!latestDecision) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-center text-lg">
          Không tìm thấy quyết định cho học kỳ này
        </p>
      </div>
    );
  }

  const textClass = "text-[14.5pt] font-times leading-[1.5]";

  return (
    <>
      {/* Block 1: Hiển thị quyết định */}
      <div className="max-w-6xl mx-auto p-8">
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
                <h1 className="text-[14.5pt] font-bold uppercase">
                  QUYẾT ĐỊNH
                </h1>
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
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Nghị định số 99/2019/NĐ-CP ngày 30/12/2019 của Chính
                    Phủ về việc Quy định chi tiết và hướng dẫn thi hành một số
                    điều của Luật sửa đổi, bổ sung một số điều của Luật Giáo dục
                    đại học;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 1177/QĐ-ĐHFPT ngày 09/11/2023 của Chủ
                    tịch Hội đồng trường Trường Đại học FPT về việc ban hành Quy
                    chế tổ chức và hoạt động của Trường Đại học FPT;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 17/QĐ-BGDĐT ngày 02/01/2020 của Bộ Giáo
                    dục và Đào tạo về việc cho phép thành lập Phân hiệu trường
                    Đại học FPT tại TP.HCM;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 229/QĐ-BGDĐT ngày 31/01/2020 của Bộ
                    Giáo dục và Đào tạo về việc cho phép Phân hiệu trường Đại
                    học FPT tại TP.HCM tổ chức hoạt động đào tạo;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 15/QĐ-ĐHFPT ngày 06/01/2020 của Chủ
                    tịch Hội đồng trường Trường Đại học FPT về việc ban hành Quy
                    chế tổ chức và hoạt động của Phân hiệu Trường Đại học FPT
                    tại TP.HCM;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 10/QĐ-ĐHFPT ngày 06/01/2016 của Hiệu
                    trưởng trường Đại học FPT về Sửa đổi bổ sung một số Điều
                    trong Quy định về tốt nghiệp đại học chính quy của Trường
                    Đại học FPT;
                  </p>
                  {latestDecision.basedOn?.map((item, index) => (
                    <p key={index} className="mt-2 indent-[1.27cm]">
                      {item}
                    </p>
                  ))}
                  <p className="mt-2 indent-[1.27cm]">
                    Theo đề nghị của Trưởng phòng TC&QL Đào tạo.
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
                {mentorsError ? (
                  <p className="text-center text-red-500">
                    Lỗi: {mentorsError}
                  </p>
                ) : mentors.length === 0 ? (
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
      {/* Block 2: Form quyết định mới */}
      <div className="max-w-8xl mx-auto p-8">
        <Card className={`${textClass} shadow-lg`}>
          <CardContent className="p-10">
            <div className="text-center">
              <p className="font-bold uppercase">
                {latestDecision?.decisionTitleB ||
                  "DANH SÁCH GIAO VÀ HƯỚNG DẪN KHÓA LUẬN TỐT NGHIỆP"}
              </p>
              <p className="italic mt-3">
                (Ban hành kèm theo Quyết định số{" "}
                {latestDecision?.decisionNameA || "___"}{" "}
                {format(
                  new Date(latestDecision?.decisionDate || new Date()),
                  "dd/MM/yyyy"
                )}
                <br />
                của Giám Đốc phân hiệu Trường Đại học FPT tại TP. Hồ Chí Minh)
              </p>
            </div>
          </CardContent>
          <div className="pb-6">
            <DataTableList columns={columnsList} data={guidanceList} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default DecisionView;

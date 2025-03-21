import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";

export const UpdateDecision = () => {
  const [keynum, setKeynum] = useState("123");
  const [keyd, setKeyd] = useState("22");
  const [keym, setKeym] = useState("03");
  const [keyy, setKeyy] = useState("2025");
  const [decisionTitle, setDecisionTitle] = useState(
    "Về việc giao hướng dẫn khóa luận tốt nghiệp - học kỳ Spring 2025 Cơ sở Hồ Chí Minh\nCơ sở Hồ Chí Minh"
  );

  const [condition1, setCondition1] = useState(
    "Căn cứ Quyết định số 1494/QĐ-ĐHFPT ngày 31/12/2024 của Hiệu trưởng Trường Đại học FPT về việc phân công phê duyệt, ký văn bản tại các Khối/Viện/Trung tâm;"
  );
  const [condition2, setCondition2] = useState(
    "Căn cứ Quyết định số 842/QĐ-ĐHFPT ngày 12/08/2024 của Hiệu trưởng trường Đại học FPT về việc sửa đổi một số điều và ban hành Quy chế đào tạo Hệ đại học chính quy tại Trường Đại học FPT;"
  );

  const [decisionContent, setDecisionContent] = useState(
    `Điều 1. Giao nhiệm vụ cho các giảng viên có tên sau hướng dẫn sinh viên làm khóa luận tốt nghiệp - học kỳ  Spring 2025 cơ sở Hồ Chí Minh (kèm theo danh sách sinh viên và đề tài).`
  );

  return ( 
    <div > 
       <Header title="Profile" href="/" currentPage="Cập nhật thông tin cá nhân" />
 <div className="max-w-6xl mx-auto p-8">
      <Card className="font-times text-[13pt] leading-[1.5] shadow-lg">
        <CardContent className="p-32">
          {/* HEADER */}
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

          {/* QUYẾT ĐỊNH HEADER */}
          <div className="mt-6 flex justify-between text-[14.5pt]">
            <p>
              Số:{" "}
              <input
                type="text"
                value={keynum}
                onChange={(e) => setKeynum(e.target.value)}
                className="border border-black px-2 w-16"
              />{" "}
              /QĐ-FPTUHCM
            </p>
            <p className="italic pr-[0.9cm]">
              TP. Hồ Chí Minh, ngày{" "}
              <input
                type="text"
                value={keyd}
                onChange={(e) => setKeyd(e.target.value)}
                className="border border-black px-2 w-8"
              />{" "}
              tháng{" "}
              <input
                type="text"
                value={keym}
                onChange={(e) => setKeym(e.target.value)}
                className="border border-black px-2 w-8"
              />{" "}
              năm{" "}
              <input
                type="text"
                value={keyy}
                onChange={(e) => setKeyy(e.target.value)}
                className="border border-black px-2 w-16"
              />
            </p>
          </div>

          {/* TITLE */}
          <div className="mt-6 text-center">
            <h1 className="text-[14.5pt] font-bold uppercase">QUYẾT ĐỊNH</h1>
            <textarea
              value={decisionTitle}
              onChange={(e) => setDecisionTitle(e.target.value)}
              className="border border-black w-full px-2 font-bold text-[14.5pt] text-center leading-snug"
              rows={2}
            />

            <hr className="border-t border-black w-1/4 mx-auto mt-2" />
          </div>

          {/* PHẦN CĂN CỨ - FULL */}
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
            <div>
            <p className="mt-2 ">
                <textarea
                  value={condition1}
                  onChange={(e) => setCondition1(e.target.value)}
                  className="border border-black w-full px-2"
                  rows={2}
                />
              </p>

              <p className="mt-2 ">
                <textarea
                  value={condition2}
                  onChange={(e) => setCondition2(e.target.value)}
                  className="border border-black w-full px-2"
                  rows={2}
                />
              </p>
            </div>
           
              <p className="mt-2 indent-[1.27cm]">
                Theo đề nghị của Trưởng phòng TC&QL Đào tạo.
              </p>
            </div>
          </div>

          {/* NỘI DUNG QUYẾT ĐỊNH */}
          <div className="text-[14.5pt]">
            <p className="mt-6 font-bold text-center">QUYẾT ĐỊNH:</p>
            <p className="mt-2  text-justify">
              <textarea
                value={decisionContent}
                onChange={(e) => setDecisionContent(e.target.value)}
                className="border border-black w-full px-2"
                rows={3}
              />
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
   
  );
};

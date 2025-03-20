
import { Card, CardContent } from "@/components/ui/card";

export const DecisionView = () => {
  // Dữ liệu mẫu cho bảng giảng viên (có thể mở rộng)
  const lecturers = [
    {
      id: 1,
      name: "Nguyễn Thị Cẩm Hương",
      specialization: "Chủ nhiệm bộ môn SE",
      department: "Trường đại học FPT",
    },
    {
      id: 2,
      name: "Nguyễn Minh Sang",
      specialization: "Giảng viên bộ môn SE",
      department: "Trường đại học FPT",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Card className="font-times text-[13pt] leading-[1.5] shadow-lg">
        <CardContent className="p-20">
          
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

          {/* Document Number */}
          <div className="mt-6 flex justify-between text-[14.5pt]">
            <p className="indent-[1.27cm]">Số: [keynum]/QĐ-FPTUHCM</p>
            <p className="italic pr-[0.9cm]">
              TP. Hồ Chí Minh, ngày [keyd] tháng [keym] năm [keyy]
            </p>
          </div>


          <div className="mt-6 text-center">
            <h1 className="text-[14.5pt] font-bold uppercase">QUYẾT ĐỊNH</h1>
            <p className="mt-2 text-[14.5pt] font-bold">
              Về việc giao hướng dẫn khóa luận tốt nghiệp - học kỳ Spring 2025
            </p>
            <p className="text-[14.5pt] font-bold">Cơ sở Hồ Chí Minh</p>
            <hr className="border-t border-black w-1/4 mx-auto mt-2" />
          </div>

          {/* Legal Basis */}
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

          {/* Decision Content */}
          <div className="text-[14.5pt]">
            <p className="mt-6 font-bold text-center">QUYẾT ĐỊNH:</p>
            <p className="mt-2 indent-[1.27cm] text-justify">
              <span className="font-bold">Điều 1. </span> Giao nhiệm vụ cho các
              giảng viên có tên sau hướng dẫn sinh viên làm khóa luận tốt nghiệp
              - học kỳ Spring 2025 cơ sở Hồ Chí Minh (kèm theo danh sách sinh
              viên và đề tài).
            </p>
          </div>

          {/* Lecturers Table */}
          <div className="mt-4">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2">STT</th>
                  <th className="border border-gray-400 p-2">Họ và tên</th>
                  <th className="border border-gray-400 p-2">Chuyên môn</th>
                  <th className="border border-gray-400 p-2">Bộ phận</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((lecturer) => (
                  <tr key={lecturer.id}>
                    <td className="border border-gray-400 p-2 text-center">
                      {lecturer.id}
                    </td>
                    <td className="border border-gray-400 p-2">
                      {lecturer.name}
                    </td>
                    <td className="border border-gray-400 p-2">
                      {lecturer.specialization}
                    </td>
                    <td className="border border-gray-400 p-2">
                      {lecturer.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionView;

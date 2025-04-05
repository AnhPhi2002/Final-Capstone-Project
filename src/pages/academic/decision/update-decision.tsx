// "use client";

// import { useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import Header from "@/components/header";
// import { DataTable } from "./columns/data-table";
// import { useAppDispatch } from "@/hooks/reduxHooks";
// import { useParams } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/api/redux/store";
// import { columns } from "./columns/columns";
// import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// const formSchema = z.object({
//   keynum: z.string(),
//   keyd: z.string(),
//   keym: z.string(),
//   keyy: z.string(),
//   decisionTitle: z.string(),
//   condition1: z.string(),
//   condition2: z.string(),
//   decisionContent: z.string(),
//   decisionClause2: z.string(),
//   decisionClause3: z.string(),
//   decisionClause4: z.string(),
//   signerName: z.string(),
// });

// type FormValues = z.infer<typeof formSchema>;

// export const UpdateDecision = () => {
//   const dispatch = useAppDispatch();
//   const { semesterId } = useParams<{ semesterId: string }>();
//   const { mentors, loading, error } = useSelector(
//     (state: RootState) => state.mentors
//   );

//   useEffect(() => {
//     if (semesterId) {
//       dispatch(fetchMentorsBySemesterId(semesterId) as any);
//     }
//   }, [dispatch, semesterId]);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       keynum: "123",
//       keyd: "22",
//       keym: "03",
//       keyy: "2025",
//       decisionTitle:
//         "Về việc giao hướng dẫn khóa luận tốt nghiệp - học kỳ Spring 2025 Cơ sở Hồ Chí Minh\nCơ sở Hồ Chí Minh",
//       condition1:
//         "Căn cứ Quyết định số 1494/QĐ-ĐHFPT ngày 31/12/2024 của Hiệu trưởng Trường Đại học FPT về việc phân công phê duyệt, ký văn bản tại các Khối/Viện/Trung tâm;",
//       condition2:
//         "Căn cứ Quyết định số 842/QĐ-ĐHFPT ngày 12/08/2024 của Hiệu trưởng trường Đại học FPT về việc sửa đổi một số điều và ban hành Quy chế đào tạo Hệ đại học chính quy tại Trường Đại học FPT;",
//       decisionContent:
//         "Điều 1. Giao nhiệm vụ cho các giảng viên có tên sau hướng dẫn sinh viên làm khóa luận tốt nghiệp - học kỳ Spring 2025 cơ sở Hồ Chí Minh (kèm theo danh sách sinh viên và đề tài).",
//       decisionClause2:
//         "Điều 2. Các sinh viên có tên trong danh sách kèm theo thực hiện đề tài từ ngày 06/01/2025 đến ngày 05/05/2025 theo sự hướng dẫn của các giảng viên đã được phân công hướng dẫn",
//       decisionClause3:
//         "Điều 3. Quyết định này có hiệu lực kể từ ngày 06/01/2025",
//       decisionClause4:
//         "Điều 4. Giám đốc cơ sở đào tạo HCM, Trưởng ban Đào tạo, Trưởng ban Tuyển sinh, Kế toán trưởng, Trưởng phòng Đảm bảo chất lượng, Trưởng phòng TC&QL Đào tạo, Trưởng phòng Khảo thí, Trưởng phòng Dịch vụ sinh viên, Trưởng phòng Công tác sinh viên, Trưởng phòng Thông tin thư viện, Trưởng phòng Quan hệ doanh nghiệp, Trưởng phòng Phát triển cá nhân, Trưởng phòng IT, các sinh viên có tên tại Điều 2 và các bộ phận, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./.",
//       signerName: "Trần Ngọc Tuấn",
//     },
//   });

//   const textClass = "text-[14.5pt] font-times leading-[1.5]";

//   return (
//     <div>
//       <Header
//         title="Profile"
//         href="/"
//         currentPage="Cập nhật thông tin cá nhân"
//       />
//       <div className="max-w-5xl mx-auto p-8">
//         <Card className={`${textClass} shadow-lg`}>
//           <CardContent className="p-10">
//             <Form {...form}>
//               <form className="space-y-4">
//                 {/* HEADER */}
//                 <div className="flex justify-between uppercase">
//                   <div className="w-1/2">
//                     <p>TRƯỜNG ĐẠI HỌC FPT</p>
//                     <p className="font-bold">PHÂN HIỆU TRƯỜNG ĐẠI HỌC FPT</p>
//                     <p className="font-bold">TẠI TP. HỒ CHÍ MINH</p>
//                   </div>
//                   <div className="w-1/2 text-right">
//                     <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
//                     <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
//                   </div>
//                 </div>

//                 {/* SỐ + NGÀY THÁNG */}
//                 <div className="mt-6 flex justify-between">
//                   <FormField
//                     control={form.control}
//                     name="keynum"
//                     render={({ field }) => (
//                       <FormItem>
//                         <p>
//                           Số:{" "}
//                           <Input
//                             {...field}
//                             className={`${textClass} inline-block w-16 border border-black px-2 h-[32px]`}
//                           />{" "}
//                           /QĐ-FPTUHCM
//                         </p>
//                       </FormItem>
//                     )}
//                   />
//                   <p className="italic pr-[0.9cm]">
//                     TP. Hồ Chí Minh, ngày{" "}
//                     <FormField
//                       control={form.control}
//                       name="keyd"
//                       render={({ field }) => (
//                         <Input
//                           {...field}
//                           className={`${textClass} inline w-8 px-1 border border-black h-[32px]`}
//                         />
//                       )}
//                     />{" "}
//                     tháng{" "}
//                     <FormField
//                       control={form.control}
//                       name="keym"
//                       render={({ field }) => (
//                         <Input
//                           {...field}
//                           className={`${textClass} inline w-8 px-1 border border-black h-[32px]`}
//                         />
//                       )}
//                     />{" "}
//                     năm{" "}
//                     <FormField
//                       control={form.control}
//                       name="keyy"
//                       render={({ field }) => (
//                         <Input
//                           {...field}
//                           className={`${textClass} inline w-16 px-1 border border-black h-[32px]`}
//                         />
//                       )}
//                     />
//                   </p>
//                 </div>

//                 {/* TIÊU ĐỀ */}
//                 <div className="text-center mt-6">
//                   <h1 className="text-[14.5pt] font-bold uppercase">
//                     QUYẾT ĐỊNH
//                   </h1>
//                   <FormField
//                     control={form.control}
//                     name="decisionTitle"
//                     render={({ field }) => (
//                       <Textarea
//                         {...field}
//                         className={`${textClass} border border-black w-full text-center font-bold`}
//                         rows={2}
//                       />
//                     )}
//                   />
//                   <hr className="border-t border-black w-1/4 mx-auto mt-2" />
//                 </div>

//                 {/* PHẦN CĂN CỨ */}
//                 <div className="mt-6 text-justify">
//                   <p className="font-bold text-center">
//                     HIỆU TRƯỞNG TRƯỜNG ĐẠI HỌC FPT
//                   </p>
//                   <div className="italic text-justify">
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Quyết định số 208/QĐ-TTg ngày 08/9/2006 của Thủ
//                       tướng Chính Phủ về việc thành lập Trường Đại học FPT;
//                     </p>
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Nghị định số 99/2019/NĐ-CP ngày 30/12/2019 của
//                       Chính Phủ về việc Quy định chi tiết và hướng dẫn thi hành
//                       một số điều của Luật sửa đổi, bổ sung một số điều của Luật
//                       Giáo dục đại học;
//                     </p>
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Quyết định số 1177/QĐ-ĐHFPT ngày 09/11/2023 của Chủ
//                       tịch Hội đồng trường Trường Đại học FPT về việc ban hành
//                       Quy chế tổ chức và hoạt động của Trường Đại học FPT;
//                     </p>
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Quyết định số 17/QĐ-BGDĐT ngày 02/01/2020 của Bộ
//                       Giáo dục và Đào tạo về việc cho phép thành lập Phân hiệu
//                       trường Đại học FPT tại TP.HCM;
//                     </p>
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Quyết định số 229/QĐ-BGDĐT ngày 31/01/2020 của Bộ
//                       Giáo dục và Đào tạo về việc cho phép Phân hiệu trường Đại
//                       học FPT tại TP.HCM tổ chức hoạt động đào tạo;
//                     </p>
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Quyết định số 15/QĐ-ĐHFPT ngày 06/01/2020 của Chủ
//                       tịch Hội đồng trường Trường Đại học FPT về việc ban hành
//                       Quy chế tổ chức và hoạt động của Phân hiệu Trường Đại học
//                       FPT tại TP.HCM;
//                     </p>
//                     <p className="mt-2 indent-[1.27cm]">
//                       Căn cứ Quyết định số 10/QĐ-ĐHFPT ngày 06/01/2016 của Hiệu
//                       trưởng trường Đại học FPT về Sửa đổi bổ sung một số Điều
//                       trong Quy định về tốt nghiệp đại học chính quy của Trường
//                       Đại học FPT;
//                     </p>
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="condition1"
//                     render={({ field }) => (
//                       <Textarea
//                         {...field}
//                         className={`${textClass} border border-black w-full px-2 mt-2`}
//                         rows={2}
//                       />
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="condition2"
//                     render={({ field }) => (
//                       <Textarea
//                         {...field}
//                         className={`${textClass} border border-black w-full px-2 mt-2`}
//                         rows={2}
//                       />
//                     )}
//                   />
//                   <p className="mt-2 indent-[1.27cm]">
//                     Theo đề nghị của Trưởng phòng TC&QL Đào tạo.
//                   </p>
//                 </div>

//                 {/* NỘI DUNG QUYẾT ĐỊNH */}
//                 <div>
//                   <p className="mt-6 font-bold text-center">QUYẾT ĐỊNH:</p>
//                   <FormField
//                     control={form.control}
//                     name="decisionContent"
//                     render={({ field }) => (
//                       <Textarea
//                         {...field}
//                         className={`${textClass} border border-black w-full px-2 mt-2`}
//                         rows={3}
//                       />
//                     )}
//                   />

//                   <div className="mt-4">
//                     {loading ? (
//                       <p className="text-center">Đang tải dữ liệu...</p>
//                     ) : error ? (
//                       <p className="text-center text-red-500">Lỗi: {error}</p>
//                     ) : (
//                       <DataTable columns={columns} data={mentors} />
//                     )}
//                     <p className={`${textClass} mt-2 text-justify`}>
//                       (Danh sách trên có 119 giảng viên hướng dẫn và 1 mentor)
//                     </p>
//                   </div>

//                   {[
//                     "decisionClause2",
//                     "decisionClause3",
//                     "decisionClause4",
//                   ].map((fieldName, idx) => (
//                     <FormField
//                       key={fieldName}
//                       control={form.control}
//                       name={fieldName as keyof FormValues}
//                       render={({ field }) => (
//                         <Textarea
//                           {...field}
//                           className={`${textClass} border border-black w-full px-2 mt-3`}
//                           rows={fieldName === "decisionClause4" ? 5 : 2}
//                         />
//                       )}
//                     />
//                   ))}
//                 </div>

//                 {/* NƠI NHẬN & CHỮ KÝ */}
//                 <div className="mt-8  flex justify-between">
//                   {/* Bên trái - Nơi nhận */}
//                   <div className="w-1/2 text-[13pt]">
//                     <p className="italic font-semibold">Nơi nhận:</p>
//                     <p>- Như Điều 4 (để t/h);</p>
//                     <p>- Lưu VT.</p>
//                   </div>

//                   <div className={`${textClass} w-1/3 text-center`}>
//                     <p className="font-bold uppercase">TUQ. HIỆU TRƯỞNG</p>
//                     <p className="font-bold uppercase">GIÁM ĐỐC</p>
//                     <FormField
//                       control={form.control}
//                       name="signerName"
//                       render={({ field }) => (
//                         <Input
//                           {...field}
//                           className="mt-24 text-center font-bold border border-black bg-white w-full"
//                         />
//                       )}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default UpdateDecision;

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const SendMailButton = () => {
//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button className="px-4 py-2">Gửi mail thông báo</Button>
//         </DialogTrigger>
//         <DialogContent className="min-w-[900px] p-6 rounded-lg">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold">
//               Gửi mail thông báo kết quả đủ điều kiện khóa luận tốt nghiệp cho sinh viên
//             </DialogTitle>
//             <DialogDescription>
//               <Tabs defaultValue="account" className="mt-4">
//                 <TabsList className="flex gap-4 border-b pb-2">
//                   <TabsTrigger value="account" className="px-4 py-2">
//                     Gửi cho tất cả sinh viên trong 1 kỳ
//                   </TabsTrigger>
//                   <TabsTrigger value="password" className="px-4 py-2">
//                     Gửi cho từng sinh viên cụ thể
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="account" className="mt-6">
//                   <div className="flex items-center gap-4">
//                     <Select>
//                       <SelectTrigger className="w-[200px]">
//                         <SelectValue placeholder="Chọn kỳ" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="spring2025">SPRING2025</SelectItem>
//                         <SelectItem value="fall2024">FALL2024</SelectItem>
//                         <SelectItem value="summer2024">SUMMER2024</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="flex justify-end mt-6">
//                     <Button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700">
//                       Gửi
//                     </Button>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="password" className="mt-6">
//                   <div className="flex gap-4 mb-4">
//                     <Input placeholder="Nhập email sinh viên" className="w-full" />
//                     <Button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700">
//                       +
//                     </Button>
//                   </div>
//                   <div className="space-y-2">
//                     {["phi@fpt.edu.vn", "phi1@fpt.edu.vn", "phi2@fpt.edu.vn"].map((email, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
//                       >
//                         <p>{email}</p>
//                         <button className="text-red-500 hover:underline">X</button>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex justify-end mt-6">
//                     <Button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
//                       Gửi
//                     </Button>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default SendMailButton;

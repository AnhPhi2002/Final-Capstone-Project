// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

// const CreateTimeline = () => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     semesterId: "",
//     round: "",
//     startDate: "",
//     endDate: "",
//     status: "ACTIVE",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("New Timeline Data:", formData);
//     setOpen(false); // Close the form after submission
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-blue-600 text-white">Tạo Timeline</Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//         <DialogHeader>
//           <DialogTitle>Tạo Timeline Mới</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//           <Label htmlFor="semesterId">Học kỳ ID</Label>
//           <Input type="text" name="semesterId" placeholder="Học kỳ ID" className="border p-2 rounded" onChange={handleChange} required />
          
//           <Label htmlFor="round">Đợt</Label>
//           <Input type="number" name="round" placeholder="Đợt" className="border p-2 rounded" onChange={handleChange} required />
          
//           <Label htmlFor="startDate">Ngày bắt đầu</Label>
//           <Input type="datetime-local" name="startDate" className="border p-2 rounded" onChange={handleChange} required />
          
//           <Label htmlFor="endDate">Ngày kết thúc</Label>
//           <Input type="datetime-local" name="endDate" className="border p-2 rounded" onChange={handleChange} required />
          
//           <Label htmlFor="status">Trạng thái</Label>
//           <Select name="status" className="border p-2 rounded" onValueChange={(value) => setFormData({ ...formData, status: value })}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Chọn trạng thái" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="ACTIVE">ACTIVE</SelectItem>
//                 <SelectItem value="PENDING">PENDING</SelectItem>
//                 <SelectItem value="CLOSED">CLOSED</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
          
//           <Label htmlFor="description">Mô tả</Label>
//           <Input type="text" name="description" placeholder="Mô tả" className="border p-2 rounded" onChange={handleChange} required />
          
//           <DialogFooter>
//             <Button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Tạo</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateTimeline;

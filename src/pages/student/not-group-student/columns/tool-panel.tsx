// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { Link, useParams } from "react-router";

// const ToolPanel = () => {
//   const { semesterId } = useParams<{ semesterId: string }>();

//   return (
//     <div className="grid grid-cols-12 pb-5 gap-5">
//       <div className="col-span-4 flex gap-3">
//         <Input placeholder="Nhập để tìm kiếm" />
//       </div>

//       <div className="col-span-3"></div>

//       <div className="col-span-3">
 
//       </div>

//       <div className="col-span-2 flex">
//         <Link
//           to={`/academic/random-group-student-page${semesterId ? `/${semesterId}` : ""}`}
//           className="w-full"
//         >
//           <Button className="w-full flex gap-3 items-center">
//             Nhóm ngẫu nhiên
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ToolPanel;

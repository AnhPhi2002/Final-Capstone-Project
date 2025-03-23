// components/CouncilReviewList.tsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchReviewCouncilsList } from "@/lib/api/redux/councilReviewSlice";
import { Link } from "react-router";
// import { Council } from "@/lib/api/types";
import { DeleteReviewTopicCouncil } from "./delete-review-topic-council";
import { UpdateReviewTopicCouncil } from "./update-review-topic-council";

export const CouncilReviewList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: councils, loading, error } = useSelector((state: RootState) => state.councilReview);
  const [deleteOpen, setDeleteOpen] = useState<string | null>(null);
  const [updateOpen, setUpdateOpen] = useState<string | null>(null);

  useEffect(() => {
    console.log("Dispatching fetchReviewCouncilsList...");
    dispatch(fetchReviewCouncilsList())
      .unwrap()
      .then((result) => console.log("Fetch councils success:", result))
      .catch((err) => console.error("Fetch councils failed:", err));
  }, [dispatch]);

  const sortedCouncils = useMemo(() => {
    const sorted = [...councils].sort((a, b) => {
      const startDateA = new Date(a.councilStartDate).getTime();
      const startDateB = new Date(b.councilStartDate).getTime();
      const endDateA = new Date(a.councilEndDate).getTime();
      const endDateB = new Date(b.councilEndDate).getTime();

      if (startDateA !== startDateB) {
        return startDateA - startDateB;
      }
      return endDateA - endDateB;
    });
    console.log("Sorted councils:", sorted);
    return sorted;
  }, [councils]);

  console.log("CouncilReview state:", { councils, loading, error });
  console.log("Rendering councils:", sortedCouncils);

  const handleRefetch = () => {
    dispatch(fetchReviewCouncilsList());
  };

  return (
    <div className="bg-gray-100">
      {loading ? (
        <p className="text-center text-gray-500 py-6">Đang tải danh sách hội đồng...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-6">Lỗi: {error}</p>
      ) : sortedCouncils.length === 0 ? (
        <p className="text-center text-gray-500 py-6">Không có hội đồng nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {sortedCouncils.map((council) => (
            <Link
              key={council.id}
              to={`/examination/council-review/${council.id}`}
              className="block border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{council.name}</h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold">Mã hội đồng:</span> {council.code}
                </p>
                <p>
                  <span className="font-semibold">Loại:</span> {council.type}
                </p>
                <p>
                  <span className="font-semibold">Vòng:</span> {council.round}
                </p>
                <p>
                  <span className="font-semibold">Trạng thái:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      council.status === "UPCOMING"
                        ? "bg-gray-500"
                        : council.status === "ACTIVE"
                        ? "bg-green-500"
                        : council.status === "COMPLETED"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {council.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Ngày tạo:</span>{" "}
                  {new Date(council.createdDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Bắt đầu:</span>{" "}
                  {new Date(council.councilStartDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Kết thúc:</span>{" "}
                  {new Date(council.councilEndDate).toLocaleDateString()}
                </p>
              </div>
              <div
                className="mt-4 flex space-x-2"
                onClick={(e) => e.stopPropagation()} // Ngăn chuyển hướng khi nhấp nút
              >
                <button
                  onClick={() => setUpdateOpen(council.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => setDeleteOpen(council.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
              <UpdateReviewTopicCouncil
                open={updateOpen === council.id}
                setOpen={() => setUpdateOpen(null)}
                council={council}
                refetchData={handleRefetch}
              />
              <DeleteReviewTopicCouncil
                open={deleteOpen === council.id}
                setOpen={() => setDeleteOpen(null)}
                councilId={council.id}
                refetchData={handleRefetch}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
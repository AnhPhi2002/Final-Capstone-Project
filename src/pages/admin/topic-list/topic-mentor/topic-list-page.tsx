import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics } from "@/lib/api/redux/topicSlice";
import { useNavigate, useParams } from "react-router";

export const TopicListPage = () => {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: topics, loading } = useSelector((state: RootState) => state.topics);

  console.log("Redux topics state:", topics);

  useEffect(() => {
    if (semesterId && topics.length === 0) { // ✅ Chỉ fetch API nếu chưa có dữ liệu
      dispatch(fetchTopics(semesterId));
    }
  }, [dispatch, semesterId, topics.length]);

  console.log("Rendering Parent Component");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Danh sách Đề Tài</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => navigate(`/topic-detail/${topic.id}`)}
            className="border p-4 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="font-semibold text-lg">{topic.nameVi} ({topic.nameEn})</h2>
            <p className="text-gray-500">{topic.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

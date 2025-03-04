import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchMajors } from "@/lib/api/redux/majorSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectMajorProps = {
  onMajorChange: (majorId?: string) => void;
};

export const SelectMajor: React.FC<SelectMajorProps> = ({ onMajorChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: majors, loading: majorsLoading } = useSelector(
    (state: RootState) => state.majors
  );


  const [selectedMajor, setSelectedMajor] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(fetchMajors()); // Gọi API lấy danh sách majors
  }, [dispatch]);

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    onMajorChange(value); // Truyền giá trị ngành học lên component cha
  };

  return (
    <Select onValueChange={handleMajorChange} value={selectedMajor}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Chọn ngành học" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {majorsLoading ? (
            <SelectItem value="loading" disabled>
              Đang tải...
            </SelectItem>
          ) : (
            <>
              <SelectItem key="all" value="all">
                Tất cả ngành học
              </SelectItem>

              {majors
                .filter((major) => major.id)
                .map((major) => (
                  <SelectItem key={major.id} value={major.id}>
                    {major.name}
                  </SelectItem>
                ))}
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

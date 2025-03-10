import { useState } from "react";

interface SelectRoundProps {
  onRoundChange: (round: number) => void;
}

export const SelectRound: React.FC<SelectRoundProps> = ({ onRoundChange }) => {
  const [round, setRound] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRound = Number(event.target.value);
    setRound(selectedRound);
    onRoundChange(selectedRound);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-gray-700">Chọn vòng duyệt:</label>
      <select
        value={round}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option value={1}>Vòng 1</option>
        <option value={2}>Vòng 2</option>
        <option value={3}>Vòng 3</option>
      </select>
    </div>
  );
};

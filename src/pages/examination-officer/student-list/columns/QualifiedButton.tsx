import { Button } from "@/components/ui/button";

type QualifiedButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

const QualifiedButton = ({ onClick, isActive }: QualifiedButtonProps) => {
  return (
    <Button variant={isActive ? "default" : "outline"} onClick={onClick}>
      Đủ điều kiện
    </Button>
  );
};

export default QualifiedButton;

import { Button } from "@/components/ui/button";

type NotQualifiedButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

const NotQualifiedButton = ({ onClick, isActive }: NotQualifiedButtonProps) => {
  return (
    <Button variant={isActive ? "default" : "outline"} onClick={onClick}>
      Không đủ điều kiện
    </Button>
  );
};

export default NotQualifiedButton;

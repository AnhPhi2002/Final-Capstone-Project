import { Button } from "@/components/ui/button";

type PreviewEmailProps = {
  content: string;
  onBack: () => void;
};

const PreviewEmail = ({ content, onBack }: PreviewEmailProps) => {
  return (
    <div className="mt-6 border p-4 rounded bg-gray-100">
      <p className="font-semibold mb-2">Preview Email:</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div className="flex justify-end mt-4">
        <Button className="bg-gray-600 text-white" onClick={onBack}>
          Quay lại chỉnh sửa
        </Button>
      </div>
    </div>
  );
};

export default PreviewEmail;

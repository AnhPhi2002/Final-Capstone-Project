import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  fetchEmailTemplates,
  fetchEmailTemplateById,
  updateEmailTemplate,
  deleteEmailTemplate,
  createEmailTemplate,
} from "@/lib/api/redux/emailTemplateSlice";
import { toast } from "sonner";
import Header from "@/components/header";

const TemplateDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { templates, selectedTemplate } = useAppSelector(
    (state) => state.emailTemplates
  );

  const [editableTemplate, setEditableTemplate] = useState({
    name: "",
    subject: "",
    body: "",
    description: "",
  });

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    body: "",
    description: "",
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmailTemplates());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTemplate) {
      setEditableTemplate({ ...selectedTemplate });
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (id: string) => {
    dispatch(fetchEmailTemplateById(id));
  };

  const handleUpdateTemplate = () => {
    if (
      !editableTemplate.name ||
      !editableTemplate.subject ||
      !editableTemplate.body
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    dispatch(
      updateEmailTemplate({ id: selectedTemplate.id, data: editableTemplate })
    ).then(() => {
      dispatch(fetchEmailTemplates()); // Cập nhật danh sách sau khi update
      toast.success("Cập nhật thành công!");
      setEditableTemplate({ name: "", subject: "", body: "", description: "" });
      navigate(-1);
    });
  };

  const handleDeleteTemplate = () => {
    if (selectedTemplate) {
      dispatch(deleteEmailTemplate(selectedTemplate.id)).then(() => {
        dispatch(fetchEmailTemplates());
        toast.success("Xóa thành công!");
        navigate(-1); 
      });
    }
  };

  const handleCreateTemplate = () => {
    if (
      !newTemplate.name ||
      !newTemplate.subject ||
      !newTemplate.body ||
      !newTemplate.description
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    dispatch(createEmailTemplate(newTemplate)).then(() => {
      dispatch(fetchEmailTemplates());
      setShowCreateForm(false);
      setNewTemplate({ name: "", subject: "", body: "", description: "" });
      toast.success("Tạo template mới thành công!");
    });
  };

  return (
    <div>
      <Header title="Tổng quan" href="/" currentPage="Template mail " />
      <div className="container mx-auto p-6">
        <Button className="mb-4" onClick={() => navigate(-1)}>
          ← Quay lại
        </Button>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách Templates</CardTitle>
              </CardHeader>
              <CardContent>
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-2 cursor-pointer border-b hover:bg-gray-200"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    {template.name}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-2">
            {selectedTemplate ? (
              <Card>
                <CardHeader>
                  <CardTitle>Cập nhật Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Tên Template"
                    value={editableTemplate.name}
                    onChange={(e) =>
                      setEditableTemplate({
                        ...editableTemplate,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Tiêu đề Email"
                    value={editableTemplate.subject}
                    onChange={(e) =>
                      setEditableTemplate({
                        ...editableTemplate,
                        subject: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Nội dung"
                    value={editableTemplate.body}
                    rows={6}
                    onChange={(e) =>
                      setEditableTemplate({
                        ...editableTemplate,
                        body: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Mô tả"
                    value={editableTemplate.description}
                    rows={2}
                    onChange={(e) =>
                      setEditableTemplate({
                        ...editableTemplate,
                        description: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-between mt-6">
                    <Button onClick={handleUpdateTemplate}>Lưu</Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteTemplate}
                    >
                      Xóa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p>Chọn một template để xem chi tiết </p>
            )}
          </div>
        </div>

        <Button
          className="mt-4"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Đóng Form" : "Tạo Template Mới"}
        </Button>

        {showCreateForm && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Tạo Template Mới</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Tên Template"
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, name: e.target.value })
                }
              />
              <Input
                placeholder="Tiêu đề Email"
                value={newTemplate.subject}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, subject: e.target.value })
                }
              />
              <Textarea
                placeholder="Nội dung"
                value={newTemplate.body}
                rows={6}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, body: e.target.value })
                }
              />
              <Textarea
                placeholder="Mô tả"
                value={newTemplate.description}
                rows={2}
                onChange={(e) =>
                  setNewTemplate({
                    ...newTemplate,
                    description: e.target.value,
                  })
                }
              />
              <Button className="mt-6" onClick={handleCreateTemplate}>
                Lưu
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TemplateDetail;

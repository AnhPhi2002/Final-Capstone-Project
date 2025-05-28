import { useEffect, useState, useRef } from "react";
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
import { Plus, X, Save, Trash2, Edit, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

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
  const [showPlaceholdersEdit, setShowPlaceholdersEdit] = useState(false);
  const [showPlaceholdersCreate, setShowPlaceholdersCreate] = useState(false);

  // Refs to access the Textarea elements
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  const createTextareaRef = useRef<HTMLTextAreaElement>(null);

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
      dispatch(fetchEmailTemplates());
      // toast.success("Cập nhật thành công!");
      setEditableTemplate({ name: "", subject: "", body: "", description: "" });
      // navigate(-1);
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

  // List of available placeholders
  const placeholders = [
    { key: "{{username}}", description: "Tên người nhận" },
    { key: "{{deadline}}", description: "Thời gian deadline" },
    { key: "{{studentCode}}", description: "Mã sinh viên" },
    { key: "{{reviewRound}}", description: "Vòng kiểm tra" },
    { key: "{{reviewTime}}", description: "Thời gian kiểm tra" },
    { key: "{{room}}", description: "Phòng" },
    { key: "{{semesterCode}}", description: "Mã học kỳ" },
    { key: "{{topicCode}}", description: "Mã đề tài" },
    { key: "{{topicNameVi}}", description: "Tên tiếng Việt của đề tài" },
    { key: "{{groupCode}}", description: "Mã nhóm" },
    { key: "{{topicNameEn}}", description: "Tên tiếng Anh của đề tài" },
    { key: "{{defenseRound}}", description: "Vòng bảo vệ" },
    { key: "{{defenseTime}}", description: "Thời gian bảo vệ" },
    { key: "{{eligibilityMessage}}", description: "Trạng thái đủ điều kiện" },
  ];

  // Function to insert placeholder into the Textarea at the cursor position
  const insertPlaceholder = (
    placeholder: string,
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    currentValue: string,
    setValue: (newValue: string) => void
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      currentValue.substring(0, start) +
      placeholder +
      currentValue.substring(end);

    setValue(newText);

    // Move cursor to the end of the inserted placeholder
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + placeholder.length;
      textarea.focus();
    }, 0);
  };

  // Handle placeholder click for edit form
  const handleInsertPlaceholderEdit = (placeholder: string) => {
    insertPlaceholder(
      placeholder,
      editTextareaRef,
      editableTemplate.body,
      (newValue) =>
        setEditableTemplate({ ...editableTemplate, body: newValue })
    );
  };

  // Handle placeholder click for create form
  const handleInsertPlaceholderCreate = (placeholder: string) => {
    insertPlaceholder(
      placeholder,
      createTextareaRef,
      newTemplate.body,
      (newValue) => setNewTemplate({ ...newTemplate, body: newValue })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Quản lý Template Email"
      />

      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Template Email</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tạo, chỉnh sửa và quản lý các template email của bạn.
            </p>
          </div>
          <Button
           
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: Template List */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader className="bg-gray-100 border-b">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Danh sách Template
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-[70vh] overflow-y-auto">
                {templates.length > 0 ? (
                  templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors ${
                        selectedTemplate?.id === template.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{template.name}</span>
                        <Edit className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">{template.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500 text-sm">Chưa có template nào.</p>
                )}
              </CardContent>
            </Card>
            <Button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="w-4 h-4" /> Tạo Template Mới
            </Button>
          </div>

          {/* Main Content: Edit or Create Form */}
          <div className="lg:col-span-3">
            {/* Edit Template Section */}
            {selectedTemplate && !showCreateForm ? (
              <Card className="shadow-md">
                <CardHeader className="bg-gray-100 border-b">
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Chỉnh sửa Template: {selectedTemplate.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên Template</label>
                    <Input
                      placeholder="Tên Template"
                      value={editableTemplate.name}
                      onChange={(e) =>
                        setEditableTemplate({
                          ...editableTemplate,
                          name: e.target.value,
                        })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tiêu đề Email</label>
                    <Input
                      placeholder="Tiêu đề Email"
                      value={editableTemplate.subject}
                      onChange={(e) =>
                        setEditableTemplate({
                          ...editableTemplate,
                          subject: e.target.value,
                        })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nội dung Email</label>
                    <Textarea
                      ref={editTextareaRef}
                      placeholder="Nội dung (Sử dụng các placeholder như {{username}}, {{deadline}}, ...)"
                      value={editableTemplate.body}
                      rows={8}
                      onChange={(e) =>
                        setEditableTemplate({
                          ...editableTemplate,
                          body: e.target.value,
                        })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                    {/* Note Section for Placeholders */}
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setShowPlaceholdersEdit(!showPlaceholdersEdit)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        {showPlaceholdersEdit ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        <span>Ghi chú: Các placeholder có thể sử dụng</span>
                      </button>
                      {showPlaceholdersEdit && (
                        <div className="mt-2 p-4 bg-gray-100 rounded-md">
                          <p className="text-sm text-gray-700 font-medium mb-2">
                            Nhấn vào placeholder để thêm vào nội dung email:
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {placeholders.map((placeholder) => (
                              <li key={placeholder.key}>
                                <button
                                  type="button"
                                  onClick={() => handleInsertPlaceholderEdit(placeholder.key)}
                                  className="text-blue-600 hover:underline"
                                >
                                  <span className="font-medium">{placeholder.key}</span>
                                </button>: {placeholder.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mô tả</label>
                    <Textarea
                      placeholder="Mô tả"
                      value={editableTemplate.description}
                      rows={3}
                      onChange={(e) =>
                        setEditableTemplate({
                          ...editableTemplate,
                          description: e.target.value,
                        })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setEditableTemplate({ name: "", subject: "", body: "", description: "" })}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Hủy
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteTemplate}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Xóa
                    </Button>
                    <Button
                      onClick={handleUpdateTemplate}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Lưu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : !showCreateForm ? (
              <Card className="shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">Chọn một template từ danh sách để chỉnh sửa.</p>
                </CardContent>
              </Card>
            ) : null}

            {/* Create Template Section */}
            {showCreateForm && (
              <Card className="shadow-md mt-6">
                <CardHeader className="bg-gray-100 border-b flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Tạo Template Mới
                  </CardTitle>
                  <Button
                    variant="ghost"
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên Template</label>
                    <Input
                      placeholder="Tên Template"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, name: e.target.value })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tiêu đề Email</label>
                    <Input
                      placeholder="Tiêu đề Email"
                      value={newTemplate.subject}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, subject: e.target.value })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nội dung Email</label>
                    <Textarea
                      ref={createTextareaRef}
                      placeholder="Nội dung (Sử dụng các placeholder như {{username}}, {{deadline}}, ...)"
                      value={newTemplate.body}
                      rows={8}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, body: e.target.value })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                    {/* Note Section for Placeholders */}
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setShowPlaceholdersCreate(!showPlaceholdersCreate)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        {showPlaceholdersCreate ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        <span>Ghi chú: Các placeholder có thể sử dụng</span>
                      </button>
                      {showPlaceholdersCreate && (
                        <div className="mt-2 p-4 bg-gray-100 rounded-md">
                          <p className="text-sm text-gray-700 font-medium mb-2">
                            Nhấn vào placeholder để thêm vào nội dung email:
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {placeholders.map((placeholder) => (
                              <li key={placeholder.key}>
                                <button
                                  type="button"
                                  onClick={() => handleInsertPlaceholderCreate(placeholder.key)}
                                  className="text-blue-600 hover:underline"
                                >
                                  <span className="font-medium">{placeholder.key}</span>
                                </button>: {placeholder.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mô tả</label>
                    <Textarea
                      placeholder="Mô tả"
                      value={newTemplate.description}
                      rows={3}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          description: e.target.value,
                        })
                      }
                      className="border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewTemplate({ name: "", subject: "", body: "", description: "" });
                      }}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Hủy
                    </Button>
                    <Button
                      onClick={handleCreateTemplate}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Lưu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
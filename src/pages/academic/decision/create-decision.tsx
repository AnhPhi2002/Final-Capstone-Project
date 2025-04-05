'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { AppDispatch, RootState } from '@/lib/api/redux/store';
import { createDecision, CreateDecisionPayload } from '@/lib/api/redux/decisionSlice';
import { fetchMentorsBySemesterId } from '@/lib/api/redux/mentorSlice';
import { DataTable } from './columns/data-table';
import { columns } from './columns/columns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from 'sonner';
import { z } from 'zod';
import { fetchUserProfile } from '@/lib/api/redux/authSlice';
import { uploadDecisionFile, resetUploadDecision } from '@/lib/api/redux/uploadDecisionSlice';

// Định nghĩa schema Zod cho formData
const decisionSchema = z.object({
  decisionName: z.string().min(1, { message: 'Mã quyết định không được để trống' }),
  decisionTitle: z.string().min(1, { message: 'Tiêu đề quyết định không được để trống' }),
  decisionDate: z.date().refine((date) => date >= new Date(), {
    message: 'Ngày quyết định không được là ngày trong quá khứ',
  }),
  type: z.enum(['DRAFT', 'FINAL'], { message: 'Loại quyết định phải là DRAFT hoặc FINAL' }),
  basedOn: z.array(z.string()).refine((arr) => arr.every((item) => item.trim() !== ''), {
    message: 'Căn cứ không được để trống',
  }),
  content: z.string().min(1, { message: 'Nội dung quyết định không được để trống' }),
  clauses: z.array(z.string()).refine((arr) => arr.every((item) => item.trim() !== ''), {
    message: 'Điều khoản không được để trống',
  }),
  proposal: z.string().min(1, { message: 'Đề xuất không được để trống' }),
  signature: z.string().min(1, { message: 'Chữ ký không được để trống' }),
  participants: z.string().optional(),
});

export const CreateDecision = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.decision);
  const { mentors, loading: mentorsLoading, error: mentorsError } = useSelector(
    (state: RootState) => state.mentors
  );
  const { draftFile, finalFile, loading: uploadDecisionLoading, error: uploadDecisionError } = useSelector(
    (state: RootState) => state.uploadDecision
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (semesterId && !user) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch(() => {
          toast.error('Vui lòng đăng nhập để tiếp tục');
          navigate('/login');
        });
    }
    if (semesterId) {
      dispatch(fetchMentorsBySemesterId(semesterId));
    }
  }, [dispatch, semesterId, user, navigate]);

  const [formData, setFormData] = useState({
    decisionName: '',
    decisionTitle: '',
    decisionDate: new Date(),
    type: 'DRAFT' as 'DRAFT' | 'FINAL',
    basedOn: [''],
    content: '',
    clauses: [''],
    proposal: '',
    signature: '',
    participants: '',
    decisionURL: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const textClass = 'text-[14.5pt] font-times leading-[1.5]';

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleAppendBasedOn = () => {
    setFormData((prev) => ({ ...prev, basedOn: [...prev.basedOn, ''] }));
  };

  const handleAppendClause = () => {
    setFormData((prev) => ({ ...prev, clauses: [...prev.clauses, ''] }));
  };

  const updateBasedOn = (index: number, value: string) => {
    const newBasedOn = [...formData.basedOn];
    newBasedOn[index] = value;
    setFormData((prev) => ({ ...prev, basedOn: newBasedOn }));
    setFormErrors((prev) => ({ ...prev, basedOn: '' }));
  };

  const updateClause = (index: number, value: string) => {
    const newClauses = [...formData.clauses];
    newClauses[index] = value;
    setFormData((prev) => ({ ...prev, clauses: newClauses }));
    setFormErrors((prev) => ({ ...prev, clauses: '' }));
  };

  const handleRemoveBasedOn = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      basedOn: prev.basedOn.filter((_, i) => i !== index),
    }));
    if (formData.basedOn.every((item, i) => i === index || item.trim() !== '')) {
      setFormErrors((prev) => ({ ...prev, basedOn: '' }));
    }
  };

  const handleRemoveClause = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      clauses: prev.clauses.filter((_, i) => i !== index),
    }));
    if (formData.clauses.every((item, i) => i === index || item.trim() !== '')) {
      setFormErrors((prev) => ({ ...prev, clauses: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadDecisionFile({ file, type: formData.type }))
        .unwrap()
        .then((result: { fileUrl: string; fileName: string }) => {
          updateField('decisionURL', result.fileUrl);
          toast.success('Tải file thành công!');
        })
        .catch((error: string) => {
          toast.error(`Lỗi khi tải file: ${error}`);
        });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!semesterId) {
      setFormErrors({ semesterId: 'semesterId không được để trống' });
      toast.error('semesterId không được để trống');
      return;
    }

    if (!user) {
      toast.error('Vui lòng đăng nhập để tạo quyết định');
      navigate('/login');
      return;
    }

    const validationResult = decisionSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const path = err.path[0] as string;
        errors[path] = err.message;
      });
      setFormErrors(errors);
      toast.error('Vui lòng kiểm tra lại dữ liệu nhập');
      return;
    }

    const participantsText =
      mentors.length > 0
        ? `(Danh sách trên có ${mentors.length} giảng viên hướng dẫn)`
        : 'Không có giảng viên hướng dẫn';

    const payload: CreateDecisionPayload = {
      decisionName: formData.decisionName,
      decisionTitle: formData.decisionTitle,
      decisionDate: format(formData.decisionDate, 'yyyy-MM-dd'),
      type: formData.type,
      basedOn: formData.basedOn.filter((item) => item.trim() !== ''),
      content: formData.content,
      clauses: formData.clauses.filter((item) => item.trim() !== ''),
      proposal: formData.proposal,
      signature: formData.signature,
      semesterId,
      draftFile: formData.type === 'DRAFT' ? formData.decisionURL : "",
      finalFile: formData.type === 'FINAL' ? formData.decisionURL : "",
      decisionURL: formData.decisionURL,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      participants: participantsText,
    };

    console.log('Payload gửi lên:', payload);
    console.log('Loading state:', loading);

    try {
      await dispatch(createDecision(payload)).unwrap();
      toast.success('Tạo quyết định thành công!');
      dispatch(resetUploadDecision()); // Reset uploadDecision state sau khi tạo thành công
      navigate(`/academic/decision/${semesterId}`);
    } catch (err: any) {
      const errorMessage = err.message || 'Không xác định';
      toast.error(`Lỗi khi tạo quyết định: ${errorMessage}`);
      console.error('Lỗi khi tạo quyết định:', err);
    }
  };

  if (!semesterId) {
    return (
      <div>
        <Header title="Tạo quyết định" href="/" currentPage="Tạo quyết định" />
        <div className="max-w-5xl mx-auto p-8 text-center text-red-500">
          Không tìm thấy semesterId.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" richColors />
      <Header
        title="Tạo quyết định"
        href="/"
        currentPage={`Tạo quyết định học kỳ ${semesterId}`}
      />
<div className="flex justify-end mt-6 mr-6">
  <div className="flex items-center gap-6">
    {/* Decision Type Selection */}
    <div className="flex flex-col items-end">
      <Label className={`${textClass} mb-2 font-medium text-gray-700`}>
        Loại quyết định
      </Label>
      <Select
        value={formData.type}
        onValueChange={(value) => updateField('type', value as 'DRAFT' | 'FINAL')}
      >
        <SelectTrigger 
          className={`
            ${textClass} 
            w-[180px] 
            border-gray-300 
            bg-white 
            rounded-md 
            shadow-sm 
            focus:border-blue-500 
            focus:ring-1 
            focus:ring-blue-500
          `}
        >
          <SelectValue placeholder="Chọn loại" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300 rounded-md shadow-lg">
          <SelectItem value="DRAFT">Nháp</SelectItem>
          <SelectItem value="FINAL">Chính thức</SelectItem>
        </SelectContent>
      </Select>
      {formErrors.type && (
        <p className="text-red-500 text-xs mt-1 text-right">{formErrors.type}</p>
      )}
    </div>

    {/* File Upload Section */}
    {(formData.type === 'DRAFT' || formData.type === 'FINAL') && (
      <div className="flex flex-col items-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUploadClick}
          disabled={uploadDecisionLoading}
          className={`
            border-gray-300 
            text-gray-700 
            hover:bg-gray-50 
            hover:border-gray-400 
            rounded-md 
            px-4 
            py-1
            ${uploadDecisionLoading ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          {uploadDecisionLoading 
            ? 'Đang tải...' 
            : `Tải file ${formData.type === 'DRAFT' ? 'nháp' : 'chính thức'}`
          }
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".xlsx,.xls,.doc,.docx,.pdf"
        />
        {uploadDecisionError && (
          <p className="text-red-500 text-xs mt-1 text-right">{uploadDecisionError}</p>
        )}
        {(formData.type === 'DRAFT' && draftFile?.fileUrl) && (
          <p className="text-green-600 text-xs mt-1 text-right truncate max-w-[200px]">
            File nháp: {draftFile.fileName}
          </p>
        )}
        {(formData.type === 'FINAL' && finalFile?.fileUrl) && (
          <p className="text-green-600 text-xs mt-1 text-right truncate max-w-[200px]">
            File chính thức: {finalFile.fileName}
          </p>
        )}
      </div>
    )}
  </div>
</div>
      <div className="max-w-5xl mx-auto p-8">
        <Card className={`${textClass} shadow-lg`}>
          <CardContent className="p-10">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex justify-between uppercase">
                <div className="w-1/2">
                  <p>TRƯỜNG ĐẠI HỌC FPT</p>
                  <p className="font-bold">PHÂN HIỆU TRƯỜNG ĐẠI HỌC FPT</p>
                  <p className="font-bold">TẠI TP. HỒ CHÍ MINH</p>
                </div>
                <div className="w-1/2 text-right font-bold">
                  <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                  <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <div>
                  <Label className={`${textClass} mb-1`}>Số quyết định</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={formData.decisionName}
                      onChange={(e) => updateField('decisionName', e.target.value)}
                      className={`${textClass} inline-block w-32 sm:w-40 border border-black px-2 h-[32px]`}
                    />
                    <span className={`${textClass}`}>/QĐ-FPTUHCM</span>
                  </div>
                  {formErrors.decisionName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.decisionName}</p>
                  )}
                </div>
                <div>
                  <Label className={`${textClass} mb-1`}>Ngày ban hành</Label>
                  <p className="italic pr-[0.9cm]">
                    TP. Hồ Chí Minh, ngày{' '}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-[200px] pl-3 text-left font-normal border border-black h-[32px] text-[14pt]',
                            !formData.decisionDate && 'text-muted-foreground'
                          )}
                        >
                          {formData.decisionDate
                            ? format(formData.decisionDate, 'dd/MM/yyyy')
                            : 'Chọn ngày'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.decisionDate}
                          onSelect={(date) => updateField('decisionDate', date || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </p>
                  {formErrors.decisionDate && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.decisionDate}</p>
                  )}
                </div>
              </div>

              <div className="text-center mt-6">
                <h1 className="text-[14.5pt] font-bold uppercase">QUYẾT ĐỊNH</h1>
                <Label className={`${textClass} mb-1 block`}>Tiêu đề quyết định</Label>
                <Textarea
                  value={formData.decisionTitle}
                  onChange={(e) => updateField('decisionTitle', e.target.value)}
                  className={`${textClass} border border-black w-full text-center font-bold`}
                  rows={3}
                />
                {formErrors.decisionTitle && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.decisionTitle}</p>
                )}
                <hr className="border-t border-black w-1/4 mx-auto mt-2" />
              </div>

              <div className="mt-6 text-[14.5pt]">
                <p className="font-bold text-center">HIỆU TRƯỞNG TRƯỜNG ĐẠI HỌC FPT</p>
                <div className="italic text-justify">
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 208/QĐ-TTg ngày 08/9/2006 của Thủ tướng Chính Phủ về việc thành lập Trường Đại học FPT;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Nghị định số 99/2019/NĐ-CP ngày 30/12/2019 của Chính Phủ về việc Quy định chi tiết và hướng dẫn thi hành một số điều của Luật sửa đổi, bổ sung một số điều của Luật Giáo dục đại học;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 1177/QĐ-ĐHFPT ngày 09/11/2023 của Chủ tịch Hội đồng trường Trường Đại học FPT về việc ban hành Quy chế tổ chức và hoạt động của Trường Đại học FPT;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 17/QĐ-BGDĐT ngày 02/01/2020 của Bộ Giáo dục và Đào tạo về việc cho phép thành lập Phân hiệu trường Đại học FPT tại TP.HCM;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 229/QĐ-BGDĐT ngày 31/01/2020 của Bộ Giáo dục và Đào tạo về việc cho phép Phân hiệu trường Đại học FPT tại TP.HCM tổ chức hoạt động đào tạo;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 15/QĐ-ĐHFPT ngày 06/01/2020 của Chủ tịch Hội đồng trường Trường Đại học FPT về việc ban hành Quy chế tổ chức và hoạt động của Phân hiệu Trường Đại học FPT tại TP.HCM;
                  </p>
                  <p className="mt-2 indent-[1.27cm]">
                    Căn cứ Quyết định số 10/QĐ-ĐHFPT ngày 06/01/2016 của Hiệu trưởng trường Đại học FPT về Sửa đổi bổ sung một số Điều trong Quy định về tốt nghiệp đại học chính quy của Trường Đại học FPT;
                  </p>
                  {formData.basedOn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 mt-2">
                      <Textarea
                        value={item}
                        onChange={(e) => updateBasedOn(index, e.target.value)}
                        className={`${textClass} border border-black w-full px-2 mt-2 indent-[1.27cm]`}
                        rows={3}
                      />
                      {formData.basedOn.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveBasedOn(index)}
                          className="mt-2"
                        >
                          Xóa
                        </Button>
                      )}
                      {formErrors.basedOn && formData.basedOn[index].trim() === '' && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.basedOn}</p>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAppendBasedOn}
                    className="mt-2"
                  >
                    + Thêm căn cứ
                  </Button>
                  <Label className={`${textClass} mt-4 block`}>Đề xuất</Label>
                  <Textarea
                    value={formData.proposal}
                    onChange={(e) => updateField('proposal', e.target.value)}
                    className={`${textClass} border border-black w-full px-2 mt-2 indent-[1.27cm]`}
                    rows={3}
                  />
                  {formErrors.proposal && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.proposal}</p>
                  )}
                </div>
              </div>

              <div>
                <p className="mt-6 font-bold text-center">QUYẾT ĐỊNH:</p>
                <Label className={`${textClass} mt-2 block font-bold`}>Điều 1:</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => updateField('content', e.target.value)}
                  className={`${textClass} border border-black w-full px-2 mt-2 indent-[1.27cm]`}
                  rows={3}
                />
                {formErrors.content && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>
                )}
                <div className="mt-4">
                  {mentorsLoading ? (
                    <p className="text-center">Đang tải dữ liệu...</p>
                  ) : mentorsError ? (
                    <p className="text-center text-red-500">Lỗi: {mentorsError}</p>
                  ) : mentors.length === 0 ? (
                    <p className="text-center">Không có dữ liệu giảng viên</p>
                  ) : (
                    <DataTable columns={columns} data={mentors} />
                  )}
                  <p className="mt-2 text-[14.5pt] text-justify">
                    (Danh sách trên có {mentors.length} giảng viên hướng dẫn)
                  </p>
                </div>
                {formData.clauses.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 mt-3">
                    <Textarea
                      value={item}
                      onChange={(e) => updateClause(index, e.target.value)}
                      className={`${textClass} border border-black w-full px-2 mt-2 indent-[1.27cm]`}
                      rows={3}
                    />
                    {formData.clauses.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveClause(index)}
                        className="mt-2"
                      >
                        Xóa
                      </Button>
                    )}
                    {formErrors.clauses && formData.clauses[index].trim() === '' && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.clauses}</p>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAppendClause}
                  className="mt-2"
                >
                  + Thêm điều khoản
                </Button>
              </div>

              <div className="mt-8 flex justify-between">
                <div className="w-1/2 text-[13pt]">
                  <p className="italic font-semibold">Nơi nhận:</p>
                  <p>- Như Điều 4 (để t/h);</p>
                  <p>- Lưu VT.</p>
                </div>
                <div className={`${textClass} w-1/3 text-center`}>
                  <p className="font-bold uppercase">TUQ. HIỆU TRƯỞNG</p>
                  <p className="font-bold uppercase">GIÁM ĐỐC</p>
                  <Label className={`${textClass} mt-2 block`}>Chữ ký</Label>
                  <Input
                    value={formData.signature}
                    onChange={(e) => updateField('signature', e.target.value)}
                    className="mt-24 text-center font-bold border border-black bg-white w-full"
                  />
                  {formErrors.signature && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.signature}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/academic/decision/${semesterId}`)}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={loading || uploadDecisionLoading}>
                  {loading || uploadDecisionLoading ? 'Đang lưu...' : 'Lưu quyết định'}
                </Button>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDecision;
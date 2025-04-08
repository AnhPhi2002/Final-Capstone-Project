// components/AddMemberReviewCouncil.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { addCouncilMember, fetchCouncilDetail } from "@/lib/api/redux/councilReviewSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Mentor } from "@/lib/api/types"; // Import Mentor type

const formSchema = z.object({
    email: z.string().email("Email không hợp lệ").min(1, "Vui lòng chọn một email"),
});

interface AddMemberReviewCouncilProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    councilId: string;
    semesterId: string;
}

export const AddMemberReviewCouncil: React.FC<AddMemberReviewCouncilProps> = ({
    open,
    setOpen,
    councilId,
    semesterId,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { mentors, loading: mentorLoading } = useSelector((state: RootState) => state.mentors); // Sửa mentors.data thành mentors
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        if (open && semesterId) {
            dispatch(fetchMentorsBySemesterId(semesterId));
        }
    }, [open, semesterId, dispatch]);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await dispatch(addCouncilMember({ councilId, email: data.email })).unwrap();
            toast.success("Thêm thành viên thành công!");
            dispatch(fetchCouncilDetail(councilId));
            setOpen(false);
            form.reset();
        } catch (error) {
            // console.error("Add member failed:", error);
            // toast.error("Thêm thành viên thất bại!");
            toast.error(`Tạo thất bại: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Thêm thành viên hội đồng</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 hover:text-gray-800"
                        disabled={isLoading || mentorLoading}
                    >
                        ✖
                    </button>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                    Chọn email mentor để thêm vào hội đồng.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email mentor</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={isLoading || mentorLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        mentorLoading ? "Đang tải danh sách mentor..." : "Chọn mentor"
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mentors?.length ? (
                                                    mentors.map((mentor: Mentor) => ( // Khai báo kiểu Mentor
                                                        <SelectItem key={mentor.id} value={mentor.email}>
                                                            {mentor.fullName} ({mentor.email})
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="none" disabled>
                                                        Không có mentor nào
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button
                                type="button"
                                onClick={() => setOpen(false)}
                                variant="outline"
                                disabled={isLoading || mentorLoading}
                            >
                                Hủy
                            </Button>
                            <Button type="submit" disabled={isLoading || mentorLoading}>
                                {isLoading ? "Đang thêm..." : "Thêm thành viên"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
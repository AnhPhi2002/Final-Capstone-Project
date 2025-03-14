import Header from '@/components/header'
import ToolPanel from './tool-panel'
import { TopicEnterprise } from './topic-enterprise'

export const TopicEnterprisePage = () => {
  return (
    <div className="flex flex-col h-screen">
     <Header title="Tổng quan" href="/" currentPage="Danh sách đề tài giảng viên " />
    <div className="p-5 flex-1 overflow-auto">
      <ToolPanel />
      <TopicEnterprise />
    </div>
  </div>
  )
}

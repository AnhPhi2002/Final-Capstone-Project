import Header from "@/components/header"
import Overview from "./overview"
import Revenue from "./revenue"

export const DashboardDetailPage = () => {
  return (
    <div> 
      <Header title="Tổng quan" href="/" currentPage="Dashboard" />
      <div className="grid grid-cols-12 gap-5 p-5">
        <Overview />
        <Revenue />
        {/* <BestSelling /> */}
      </div>  
    </div>
  )
}


import { Route, Routes } from "react-router"
import MainContainter from "./containers/main-container"
import LoginPage from "./pages/auth/log-in-page"

export default function Home() {
  return (
    <div>
      <Routes>
      <Route path="log-in" element={<LoginPage />} />
      <Route path="/*" element={<MainContainter />} />
      {/* <Route path="/admin/*" element={<MainContainter />} /> */}
    </Routes>
    </div>
  )
}

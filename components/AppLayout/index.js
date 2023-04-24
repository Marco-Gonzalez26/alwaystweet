import Sidebar from "components/Sidebar"
import styles, { globalStyles } from "./styles"
import { leftBarItems } from "../../constants/SideBarsLinks"
import RightSidebar from '../RightSidebar'
export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <Sidebar items={leftBarItems} />
        <main>{children}</main>
        <RightSidebar/>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

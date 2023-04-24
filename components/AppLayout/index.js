import Sidebar from "components/Sidebar"
import styles, { globalStyles } from "./styles"
import { leftBarItems } from "../../constants/SideBarsLinks"
export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <Sidebar items={leftBarItems} />
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

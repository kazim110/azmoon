import { useAppContext } from "@/contexts";
import { NavLink } from "react-router-dom";
import { LOGO } from "@/constants"
import { PodiumIcon, QuestionIcon, ScoreIcon, TeamIcon } from "@/components"
import { cn } from "@/utils";

const Sidebar = () => {
  const { state } = useAppContext();
  
  const size = 24;
  return (
    <nav className={`sidebar ${!state.showSidebar ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <div className={cn("text-blue-50 flex flex-col justify-center align-center items-center pt-0 mb-0")}>
          <img src={LOGO} alt="logo" className="w-20"/>
          <p className="mb-0" style={{ fontSize: "90%" }}>
            برنامه آزمون
          </p>
        </div>

        <ul className="sidebar-nav pe-0">
          <li className="sidebar-header fw-bolder fs-lg">دشبورد مسابقه</li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link flex active" : "sidebar-link"
              }
              to={"/"}
              rel="noopener noreferrer"
            >
              <PodiumIcon width={size} height={size} />
              <span className="align-middle me-2">مدیریت مسابقه</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/team"}
              rel="noopener noreferrer"
            >
              <TeamIcon width={size} height={size}/>
              <span className="align-middle me-2">نمایش تیم ها</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/question"}
              rel="noopener noreferrer"
            >
              <QuestionIcon width={size} height={size}/>
              <span className="align-middle me-2">نمایش سوالات</span>
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              to={"/score"}
              rel="noopener noreferrer"
            >
              <ScoreIcon width={size} height={size}/>
              <span className="align-middle me-2">نمایش نمرات تیم ها</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import "./JobSeekerLayout.css";

const JobSeekerLayout = () => {
  return (
    <div className="jobseeker-layout">
      {/* <Sidebar role="job_seeker" /> */}

      <main className="jobseeker-main">
        <Outlet />
      </main>
    </div>
  );
};

export default JobSeekerLayout;
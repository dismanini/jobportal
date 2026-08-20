import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import JobSeekerDashboard from "./pages/JobPortal/JobSeekerDashboard";
import FindJobs from "./pages/JobPortal/FindJobs";
import JobDetails from "./pages/JobPortal/JobDetails";
import ApplyJob from "./pages/JobPortal/ApplyJob";
import AppliedJobs from "./pages/JobPortal/AppliedJobs";
import SavedJobs from "./pages/JobPortal/SavedJobs";
import PostJob from "./pages/JobPortal/PostJob";
import ManageJobs from "./pages/JobPortal/ManageJobs";
import EditJob from "./pages/JobPortal/EditJob";
import Applications from "./pages/JobPortal/Applications";
import MyResume from "./pages/JobPortal/MyResume";
import Interview from "./pages/Jobportal/Interviews";
import Candidates from "./pages/Jobportal/Candidates";
import CompanyProfile from "./pages/Jobportal/CompanyProfile";
import Messages from "./pages/Jobportal/Messages";

import Notifications from "./pages/Jobportal/Notifications";
import Settings from "./pages/Jobportal/Settings";
export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<JobSeekerDashboard />} />
            

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/job-details/:id" element={<JobDetails />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/my-resume" element={<MyResume />} />
            <Route path="/job-seeker" element={<JobSeekerDashboard />} />
            <Route path="/interviews" element={<Interview />} />
            <Route path="/candidates"  element={<Candidates />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />





            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

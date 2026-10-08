import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
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
// import Home from "./pages/Dashboard/Home";
// import JobSeekerDashboard from "./pages/JobPortal/JobSeekerDashboard";
import FindJobs from "./pages/JobPortal/FindJobs";
// import JobDetails from "./pages/JobPortal/JobDetails";
// import ApplyJob from "./pages/JobPortal/ApplyJob";
import AppliedJobs from "./pages/JobPortal/AppliedJobs";
import SavedJobs from "./pages/JobPortal/SavedJobs";
import PostJob from "./pages/JobPortal/PostJob";
import ManageJobs from "./pages/JobPortal/ManageJobs";
// import EditJob from "./pages/JobPortal/EditJob";
// import Applications from "./pages/JobPortal/Applications";
// import MyResume from "./pages/JobPortal/MyResume";
import Interview from "./pages/JobPortal/Interviews";
// import Candidates from "./pages/JobPortal/Candidates";
import CompanyProfile from "./pages/JobPortal/CompanyProfile";
// import Messages from "./pages/JobPortal/Messages";

import Notifications from "./pages/JobPortal/Notifications";
import Settings from "./pages/JobPortal/Settings";


import AddJob from "./components/AddJob";

import JobList from "./components/JobList";
import EditJob from "./components/EditJob";
import JobDetails from "./components/JobDetails";
import ApplyJob from "./components/ApplyJob";
import ApplicationList from "./components/ApplicationList";
import ApplicationDetails from "./components/ApplicationDetails";
import JobSeekerDashboard from "./components/JobSeekerDashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import MyResume from "./components/MyResume";

import AdminDashboard from "./components/AdminDashboard";
import AdminJobs from "./components/AdminJobs";
import Candidates from "./components/Candidates";
import Users from "./components/Users";
import Messages from "./components/Messages";
import JobSeekerMessages from "./components/JobSeekerMessages";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route
  path="/register"
  element={<Register />}
/>
<Route path="/login" element={<Login />} />
<Route index path="/" element={<Login />} />
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* <Route index path="/" element={<JobSeekerDashboard />} /> */}
            

            {/* Others Page */}
            {/* <Route path="/profile" element={<UserProfiles />} /> */}
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            {/* <Route path="/job-details/:id" element={<JobDetails />} /> */}
            {/* <Route path="/apply-job/:id" element={<ApplyJob />} /> */}
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            {/* <Route path="/edit-job/:id" element={<EditJob />} /> */}
            {/* <Route path="/applications" element={<Applications />} /> */}
            {/* <Route path="/my-resume" element={<MyResume />} /> */}
            {/* <Route path="/job-seeker" element={<JobSeekerDashboard />} /> */}
            <Route path="/interviews" element={<Interview />} />
            <Route path="/candidates"  element={<Candidates />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
             <Route path="/addjob" element={<AddJob />} />
             <Route path="/joblist" element={<JobList />} />
             <Route
  path="/edit-job/:id"
  element={<EditJob />}
/>
<Route
  path="/job-details/:id"
  element={<JobDetails />}
/>
<Route path="/apply-job/:id" element={<ApplyJob />} />
<Route path="/applications" element={<ApplicationList />} />
<Route
  path="/application-details/:id"
  element={<ApplicationDetails />}
/>
<Route
  path="/job-seeker-dashboard"
  element={<JobSeekerDashboard />}
/>
{/* <Route
  path="/register"
  element={<Register />}
/>
<Route path="/login" element={<Login />} /> */}
<Route
  path="/profile"
  element={<MyProfile />}
/>
<Route path="/my-resume" element={<MyResume />} />
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-jobs"
  element={
    <ProtectedRoute role="admin">
      <AdminJobs />
    </ProtectedRoute>
  }
/>
<Route
  path="/candidates"
  element={
    <ProtectedRoute role="admin">
      <Candidates />
    </ProtectedRoute>
  }
/>

<Route
  path="/users"
  element={
    <ProtectedRoute role="admin">
      <Users />
    </ProtectedRoute>
  }
/>
<Route
  path="/messages"
  element={
    <ProtectedRoute role="admin">
      <Messages />
    </ProtectedRoute>
  }
/>
<Route
  path="/job-seeker-messages"
  element={
    <ProtectedRoute role="job_seeker">
      <JobSeekerMessages />
    </ProtectedRoute>
  }
/>




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

import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "/api";

export const getJobs = () => {
  return axios.get(`${API_URL}/jobs`);
};

export const createJob = (jobData: {
  title: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  experience: string;
  description: string;
  skills: string;
  status: string;
}) => {
  return axios.post(`${API_URL}/jobs`, jobData);
};

export const updateJob = (
  id: number,
  jobData: {
    title: string;
    company: string;
    location: string;
    salary: string;
    job_type: string;
    experience: string;
    description: string;
    skills: string;
    status: string;
  }
) => {
  return axios.put(`${API_URL}/jobs/${id}`, jobData);
};

export const deleteJob = (id: number) => {
  return axios.delete(`${API_URL}/jobs/${id}`);
};
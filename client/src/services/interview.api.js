import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = "/login"; // redirect to login
//     }
//     return Promise.reject(error);
//   }
// );


const generateInterviewReport = async ({jobDescription, selfDescription, resume}) => {

    try {
        const formData = new FormData()
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)
        formData.append("resume", resume)
    
        const response = await api.post("/api/interview", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    
        console.log("Generated report : ", response)
        return response
    } catch (error) {
        console.error("Error in generating report");
        toast.warning(error?.response?.data?.message,  { position: "top-center" })
    }
}

const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`)

        // console.log("Report :", response.data)
        return response.data
    } catch (error) {
        console.error("Error in fetching report: ",error)
        toast.warning(error?.response?.data?.message,  { position: "top-center" })
    }
}

const getAllInterviewReports = async () => {
    try {
        const response = await api.get(`/api/interview/`)
        console.log("Reports :", response)
        return response
    } catch (error) {
        console.error("Error in fetching reports: ",error)
        // console.log(error?.response?.data?.message)
        toast.warning(error?.response?.data?.message,  { position: "top-center" })
    }
}

export {
    generateInterviewReport,
    getAllInterviewReports,
    getInterviewReportById
}
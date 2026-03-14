import { create } from "zustand"

export const interviewProvider = create((set) => ({
    loading : false,
    report : null,
    reports : [],
    setLoading: (loadingData) => set({ loading: loadingData }),
    setReport: (reportData) => set({ report: reportData}),
    setReports: (reportData) => set({ reports: reportData}),

}))
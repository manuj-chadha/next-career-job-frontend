import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        lastFetched: null,
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        appliedJobsFetched: false,
        savedJobsFetched: false,
        searchedQuery:"",
        jobLoading: false,
        appliedJobsLoading: false,
        savedJobs: [],
        savedJobsLoading: false,
        filters: {
            location: '',
            industry: '',
            salary: ''
        },
        totalJobs : 0,
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
            state.lastFetched=Date.now();
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setJobLoading: (state, action) => {
            state.jobLoading = action.payload;
        },
        setAppliedJobsLoading: (state, action) =>{
            state.appliedJobsLoading=action.payload;
        },
        setAppliedJobsFetched : (state, action) =>{
            state.appliedJobsFetched=action.payload;
        },
        setSavedJobsFetched : (state, action) =>{
            state.savedJobsFetched=action.payload;
        },
        setAllSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
        setSavedJobsLoading: (state, action) =>{
            state.savedJobsLoading=action.payload;
        },
        setTotalJobs : (state, action) => {
            state.totalJobs=action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
        
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery,
    setJobLoading,
    setAppliedJobsLoading,
    setAppliedJobsFetched,
    setSavedJobsFetched,
    setSavedJobsLoading,
    setAllSavedJobs,
    setFilters,
    setTotalJobs
} = jobSlice.actions;
export default jobSlice.reducer;
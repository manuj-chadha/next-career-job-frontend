import { setCompanies} from '@/redux/companySlice'
import store from '@/redux/store'
import API from '@/utils/axios'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const {user}= useSelector(store => store.auth)
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await API.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log(res);
                if(res.data.success){
                    // console.log(res.data.companies.length);
                    dispatch(setCompanies(res.data.companies));
                    // dispatch(setCompanies(null));
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies
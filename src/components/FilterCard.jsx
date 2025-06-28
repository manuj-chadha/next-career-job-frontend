import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Noida", "Bangalore", "Hyderabad", "Gurgaon", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Front End Developer", "Back End Developer", "Full Stack Developer"]
  },
  {
    filterType: "Salary",
    array: ["3-6 LPA", "6-12 LPA", "12-24 LPA"]
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const defaultFilters={
    location: '',
    industry: '',
    salary: ''
  }

  const [filters, setLocalFilters] = useState(defaultFilters);

  const handleFilterChange = (type, value) => {
    const updated = { ...filters, [type.toLowerCase()]: value };
    setLocalFilters(updated);
  };
  const handleClearFilters=()=>{
    dispatch(setFilters(defaultFilters));
    setLocalFilters(defaultFilters);
  }

  useEffect(() => {
    dispatch(setFilters(filters));
  }, [filters]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <button
          onClick={handleClearFilters}
          className="px-2.5 py-1 border border-gray-300 text-xs text-gray-600 rounded hover:bg-gray-100 transition-all"
        >
          Reset
        </button>
      </div>
      
      <hr className='mt-3' />
      {
        filterData.map((data, index) => (
          <div key={index}>
            <h1 className='font-bold text-lg my-3'>{data.filterType}</h1>
            <RadioGroup
              value={filters[data.filterType.toLowerCase()]}
              onValueChange={(val) => handleFilterChange(data.filterType, val)}
            >
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div className='flex items-center space-x-2 my-0' key={itemId}>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })
              }
            </RadioGroup>
          </div>
        ))
      }
    </div>
  );
};

export default FilterCard;

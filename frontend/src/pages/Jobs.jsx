import React, { useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';

const Jobs = () => {
    const [selectedJobType, setSelectedJobType] = useState([]); 
    const [isJobTypeOpen, setIsJobTypeOpen] = useState(true);

    const [selectedSalary, setSelectedSalary] = useState([])
    const [isSalary, setIsSalary] = useState(true)

    const [selectedExperience, setSelectedExperience] = useState([])
    const [isExperience, setIsExperience] = useState(true)

    const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];
    const salary = ['Less than $1000', '$1000 - $15,000', 'More Than $15,000'];
    const experience = ['Less than a year', '1-3 years', '3-5 years', '5-10 years']

    const handleCheckBoxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedJobType((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const toggleDropDown = () => {
        setIsJobTypeOpen((prev) => !prev);
    };

    const handleCheckSalaryChange = (event) => {
        const { value, checked } = event.target
        setSelectedSalary((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value))
    }
    const toggleSalaryDropDown = () =>{
        setIsSalary((prev) => !prev)
    }

    const handleCheckExperienceChange = (event) => {
        const { value, checked } = event.target
        setSelectedExperience((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value))
    }
    const toggleExperienceDropDown = () =>{
        setIsExperience((prev) => !prev)
    }



    return (
        <div className="flex">
            <aside className="w-60 h-screen border-r-2 px-6">
                <div className="flex justify-between py-4">
                    <h1 className="font-bold">Filter</h1>
                    <button className="text-sky-500">Clear All</button>
                </div>
                <hr className="border-t-[2px] mb-4" />

                {/* Job Type Dropdown */}
                <div>
                    <div onClick={toggleDropDown} className="flex items-center justify-between cursor-pointer">
                        <h1 className="font-semibold">Job Type</h1>
                        <button>
                            {isJobTypeOpen ? <GoChevronUp /> : <GoChevronDown />}
                        </button>
                    </div>

                    {isJobTypeOpen && (
                        <div className="mt-2 flex flex-col space-y-1">
                        {jobTypes.map((type) => (
                            <label key={type} className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                value={type}
                                checked={selectedJobType.includes(type)}
                                onChange={handleCheckBoxChange}
                                className="mr-2"
                            />
                            {type}
                            </label>
                        ))}
                        </div>
                    )}
                    <hr className="border-t-[2px] my-4" />
                    <div>
                        <h1>Open to remote</h1>
                        {/* button */}
                    </div>
                    <hr className="border-t-[2px] my-4" />
                    <div onClick={toggleSalaryDropDown} className="flex items-center justify-between cursor-pointer">
                        <h1 className="font-semibold">Range Salary</h1>
                        <button>
                            {isSalary ? <GoChevronUp /> : <GoChevronDown />}
                        </button>
                    </div>

                    {isSalary && (
                        <div className="mt-2 flex flex-col space-y-1">
                        {salary.map((type) => (
                            <label key={type} className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                value={type}
                                checked={selectedSalary.includes(type)}
                                onChange={handleCheckSalaryChange}
                                className="mr-2"
                            />
                            {type}
                            </label>
                        ))}
                        </div>
                    )}
                    <hr className="border-t-[2px] my-4" />
                    <div onClick={toggleExperienceDropDown} className="flex items-center justify-between cursor-pointer">
                        <h1 className="font-semibold">Experience</h1>
                        <button>
                            {isExperience ? <GoChevronUp /> : <GoChevronDown />}
                        </button>
                    </div>

                    {isExperience && (
                        <div className="mt-2 flex flex-col space-y-1">
                        {experience.map((type) => (
                            <label key={type} className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                value={type}
                                checked={selectedExperience.includes(type)}
                                onChange={handleCheckExperienceChange}
                                className="mr-2"
                            />
                            {type}
                            </label>
                        ))}
                        </div>
                    )}
                </div>
            </aside>

            <main className="flex-1 p-6">
                <h2 className="text-lg font-semibold">Jobs</h2>
                <p>Selected Job Types: {selectedJobType.join(', ') || 'None'}</p>
            </main>
        </div>
    );
};

export default Jobs;

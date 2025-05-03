import React, { useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';

const Jobs = () => {
    const [selectedJobType, setSelectedJobType] = useState([]); 
    const [isJobTypeOpen, setIsJobTypeOpen] = useState(true);

    const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];

    const handleCheckBoxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedJobType((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const toggleDropDown = () => {
        setIsJobTypeOpen((prev) => !prev);
    };

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

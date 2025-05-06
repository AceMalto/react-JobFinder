import React, { useEffect, useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import { FiSearch } from "react-icons/fi";

const Jobs = () => {
    const [selectedJobType, setSelectedJobType] = useState([]);
    const [isJobTypeOpen, setIsJobTypeOpen] = useState(true);

    const [selectedSalary, setSelectedSalary] = useState([]);
    const [isSalary, setIsSalary] = useState(true);

    const [selectedExperience, setSelectedExperience] = useState([]);
    const [isExperience, setIsExperience] = useState(true);

    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [error, setError] = useState(null);

    const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];
    const salary = ['Less than $1000', '$1000 - $15,000', 'More Than $15,000'];
    const experience = ['Less than a year', '1-3 years', '3-5 years', '5-10 years'];

    const handleCheckBoxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedJobType((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleCheckSalaryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedSalary((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleCheckExperienceChange = (e) => {
        const { value, checked } = e.target;
        setSelectedExperience((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const toggleDropDown = () => setIsJobTypeOpen((prev) => !prev);
    const toggleSalaryDropDown = () => setIsSalary((prev) => !prev);
    const toggleExperienceDropDown = () => setIsExperience((prev) => !prev);

    // Fetch countries on load
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) throw new Error('Network response 404');
                const data = await response.json();
                const sorted = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sorted);
            } catch (err) {
                console.error('Error Fetching Countries:', err);
                setError('Failed to load countries');
            }
        };
        fetchCountries();
    }, []);

    // Fetch cities after selecting a country
    useEffect(() => {
        if (!selectedCountry) return;
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    'https://countriesnow.space/api/v0.1/countries/cities',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ country: selectedCountry }),
                    }
                );
                const result = await response.json();
                if (result.error) throw new Error(result.msg);
                setCities(result.data);
                setFilteredCities(result.data);
            } catch (err) {
                console.log(err);
                setError('Could not load cities');
            }
        };
        fetchCities();
    }, [selectedCountry]);

    const handleCityInputChange = (e) => {
        const input = e.target.value;
        setCityInput(input);
        setShowCityDropdown(true);
        const filtered = cities.filter((city) =>
            city.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredCities(filtered);
    };

    const handleCitySelect = (cityName) => {
        setCityInput(cityName);
        setSelectedCity(cityName);
        setShowCityDropdown(false);
    };

    return (
        <div className="flex">
            <aside className="w-60 h-screen border-r-2 px-6">
                <div className="flex justify-between py-4">
                    <h1 className="font-bold">Filter</h1>
                    <button className="text-sky-500">Clear All</button>
                </div>
                <hr className="border-t-[2px] mb-4" />

                {/* Job Type */}
                <div>
                    <div onClick={toggleDropDown} className="flex items-center justify-between cursor-pointer">
                        <h1 className="font-semibold">Job Type</h1>
                        <button>{isJobTypeOpen ? <GoChevronUp /> : <GoChevronDown />}</button>
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
                        {/* Add toggle later */}
                    </div>
                    <hr className="border-t-[2px] my-4" />

                    {/* Salary */}
                    <div onClick={toggleSalaryDropDown} className="flex items-center justify-between cursor-pointer">
                        <h1 className="font-semibold">Range Salary</h1>
                        <button>{isSalary ? <GoChevronUp /> : <GoChevronDown />}</button>
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

                    {/* Experience */}
                    <div onClick={toggleExperienceDropDown} className="flex items-center justify-between cursor-pointer">
                        <h1 className="font-semibold">Experience</h1>
                        <button>{isExperience ? <GoChevronUp /> : <GoChevronDown />}</button>
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
                <div className='flex gap-4 items-start'>
                    {/* Search Box */}
                    <div className='relative'>
                        <FiSearch className='text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-2' />
                        <input type="text" className='border outline-none w-96 rounded-md pl-7 py-0.5' placeholder="Search jobs..." />
                    </div>

                    {/* Country Dropdown */}
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className='border py-0.5 w-52 rounded-md px-2'
                    >
                        <option value="">Country</option>
                        {countries.map((country) => (
                            <option key={country.cca2} value={country.name.common}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>

                    {/* City Autocomplete */}
                    <div className="w-64">
                        <input
                        type="text"
                        value={cityInput}
                        onChange={(e) => {
                            const value = e.target.value;
                            setCityInput(value);
                            setShowCityDropdown(value.trim().length > 0 && filteredCities.length > 0);
                            setFilteredCities(
                            cities.filter(city =>
                                city.toLowerCase().includes(value.toLowerCase())
                            )
                            );
                        }}
                        onFocus={() => {
                            if (cityInput.trim().length > 0 && filteredCities.length > 0) {
                            setShowCityDropdown(true);
                            }
                        }}
                        onBlur={() => {
                            // delay to allow click on dropdown item
                            setTimeout(() => setShowCityDropdown(false), 150);
                        }}
                        placeholder="Select a city"
                        className="border w-96 pl-7 py-0.5 rounded-md outline-none"
                        />

                        {showCityDropdown && filteredCities.length > 0 && (
                            <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto rounded-md shadow">
                                {filteredCities.map((city, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleCitySelect(city)}
                                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    
                </div>
            </main>
        </div>
    );
};

export default Jobs;

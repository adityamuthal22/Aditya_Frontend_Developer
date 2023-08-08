import React, { useEffect, useState } from "react";

const CapsulesPage = () => {
  const [capsules, setCapsules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const handleItemClick = (capsule) => {
    setSelectedCapsule(capsule);
  };

  const handleClosePopup = () => {
    setSelectedCapsule(null);
  };

  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState({
    status: "",
    original_launch: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevSearchQuery) => ({
      ...prevSearchQuery,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams(searchQuery).toString();
      const response = await fetch(
        `https://api.spacexdata.com/v3/capsules?${queryParams}`
      );
      const data = await response.json();
      console.log("Search Results:", data);
      // Update the capsules state with the search results
      setCapsules(data);
    } catch (error) {
      console.error("Error searching capsules:", error);
    }
  };

  const handleClear = async () => {
    setSearchQuery({
      status: "",
      original_launch: "",
      type: "",
    });

    try {
      const response = await fetch("https://api.spacexdata.com/v3/capsules");
      const data = await response.json();
      setCapsules(data);
    } catch (error) {
      console.error("Error fetching capsules:", error);
    }
  };

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v3/capsules");
        const data = await response.json();
        setCapsules(data);
      } catch (error) {
        console.error("Error fetching capsules:", error);
      }
    };

    fetchCapsules();
  }, []);

  const totalPages = Math.ceil(capsules.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mr-2 px-3 py-1 rounded-lg ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = capsules.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4">
      <div className=" text-center mb-2 mt-6">
        <h1 className="text-5xl underline text-center font-bold text-orange-500">
          Search Form
        </h1>
        <div className=" w-full m-auto grid justify-items-center cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <input
            type="text"
            name="status"
            value={searchQuery.status}
            onChange={handleInputChange}
            className="bg-green-50 mt-4 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Search by Status"
          />
          <input
            type="text"
            name="original_launch"
            value={searchQuery.original_launch}
            onChange={handleInputChange}
            className="bg-green-50 mt-4 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Search by original_launch"
          />
          <input
            type="text"
            name="type"
            value={searchQuery.type}
            onChange={handleInputChange}
            className="bg-green-50 mt-4 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-green-500"
            placeholder="Search by type"
          />
        </div>
        <div className="grid justify-items-center cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ">
          <button
            className="bg-blue-500  text-white m-auto font-semibold py-2 px-20 mt-4 rounded-lg hover:bg-orange-500"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-6 mt-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={handleClear}
          >
            Clear Searched Data
          </button>
        </div>
      </div>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl text-center underline font-bold mb-4">
            SpaceX Capsules Section
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((capsule) => (
              <div
                key={capsule.capsule_serial}
                className="bg-purple-200 p-4 shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-blue-100 rounded-lg"
                onClick={() => handleItemClick(capsule)}
              >
                <h1 className="text-xl font-bold">{capsule.capsule_serial}</h1>
                <h2 className="text-gray-600 font-semibold">
                  Status:{" "}
                  <span className="text-orange-600 capitalize font-normal ">
                    {capsule.status}
                  </span>{" "}
                </h2>
                <p className="text-gray-600 font-semibold">
                  Original Launch:{" "}
                  <span className="text-blue-600 capitalize font-normal ">
                    {capsule.original_launch}
                  </span>
                </p>
                <h2 className="text-gray-600 font-semibold">
                  Type:{" "}
                  <span className="text-green-600 capitalize font-normal ">
                    {capsule.type}
                  </span>
                </h2>
                <p className="mt-2 text-gray-700 font-semibold">
                  Description:{" "}
                  <span className="text-teal-600 capitalize font-normal ">
                    {capsule.details}
                  </span>
                </p>
              </div>
            ))}
          </div>
          {selectedCapsule && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
              <div className="bg-white p-6 mx-2 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">
                  {selectedCapsule.capsule_serial}
                </h2>
                <h3 className="text-gray-600">
                  Status: {selectedCapsule.status}
                </h3>
                <p className="text-gray-600">
                  Original Launch: {selectedCapsule.original_launch}
                </p>
                <h3 className="text-gray-600">Type: {selectedCapsule.type}</h3>
                <p className="mt-2 text-gray-700">
                  Description: {selectedCapsule.details}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center mb-10 ">
        <button
          className={`mr-2 px-3 py-1 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 text-blue-800"
              : "bg-blue-500 text-white"
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className={`ml-2 px-3 py-1 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-blue-800"
              : "bg-blue-500 text-white"
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CapsulesPage;

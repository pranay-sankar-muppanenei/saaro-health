import React, { useState } from "react";
import TabHeader from "../components/ui/TabHeader";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import StatBox from "../components/ui/StatBox";
import { FiSearch } from "react-icons/fi";
import { data } from '../data/PatientQueueDummyData';

const columns = [
    { label: "Token", accessor: "token" },
    { label: "Patient Name", accessor: "name" },
    { label: "Age/Gender", accessor: "ageGender" },
    { label: "Type", accessor: "type" },
    { label: "Time", accessor: "time" },
    { label: "Status", accessor: "status" },
    { label: "Actions", accessor: "actions" },
];

const PatientQueue = () => {
    const [activeTabId, setActiveTabId] = useState("Today");
    const [searchTerm, setSearchTerm] = useState('');

    const tabOptions = [
        { id: "Today", label: "Today" },
        { id: "Tomorrow", label: "Tomorrow" },
        { id: "Upcoming", label: "Upcoming" },
    ];

    const currentData = data[activeTabId];

    const filteredData = currentData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        {
            label: "Total Patients",
            value: Object.values(data).flat().length,
        },
        {
            label: "Waiting",
            value: Object.values(data).flat().filter((p) => p.status === "Waiting").length,
        },
        {
            label: "In Consultation",
            value: Object.values(data).flat().filter((p) => p.status === "In Consultation").length,
        },
        {
            label: "Completed",
            value: Object.values(data).flat().filter((p) => p.status === "Completed").length,
        },
    ];

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 bg-white overflow-y-auto">
                    <div className="max-w-[90%] mx-auto  py-8 space-y-10">
                        <h1 className="text-2xl font-bold mb-4">Patient Queue</h1>
                        {/* Right Stats Panel */}
                           <div className="w-full mt-4 space-y-2">
  <h1 className="text-lg font-semibold mb-2">Quick Stats</h1>
  <StatBox stats={stats} />
</div>

                        <div className='flex justify-start w-max mb-4 ml-0'>
                            <TabHeader
                                tabs={tabOptions}
                                activeTabId={activeTabId}
                                setActiveTabId={setActiveTabId}
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:space-x-8">

                            {/* Left Table */}
                            <div className="flex-1">
                                <div className="relative w-full mb-4">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder=" Search Name"
                                        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-[#f1ecf9] text-[#5e3bea] focus:outline-none text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">{`${activeTabId} Queue`}</h2>
                                <div className="overflow-x-auto ">
                                    <GenericTable
                                        columns={columns}
                                        data={filteredData}
                                        renderCell={(row, accessor) => {
                                            if (accessor === 'status') {
                                                return <span className="bg-[green-100] px-2 py-1 rounded">{[row[accessor]]}</span>
                                            }
                                            return <span className="text-sm">{row[accessor]}</span>;
                                        }}
                                    />
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientQueue;

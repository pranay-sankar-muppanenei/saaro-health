import React from "react";
import { FiPlus } from "react-icons/fi";
import StatBox from "../components/ui/StatBox";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";

import { stats, appointments } from "../data/AppointmentsDummyData";
const AppointmentsDashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white overflow-y-auto">
                    <div className=" max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex  gap-8 w-full">
                            {/* Left Section */}
                            <div className="w-2/3">
                                <h1 className="text-2xl font-bold mb-4">Appointments</h1>
                                <h2 className="text-lg font-semibold mb-2">Latest Appointments</h2>
                                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                                    {appointments.map((apt) => (
                                        <div
                                            key={apt.id}
                                            className="flex justify-between items-center hover:bg-gray-100 p-2 rounded"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`/${apt.name}`+".png"}
                                                    alt="avatar"
                                                    className="rounded-full w-10 h-10"
                                                />
                                                <div>
                                                    <p className="font-medium">{apt.name}</p>
                                                    <p className="text-sm text-gray-500">{apt.time}</p>
                                                </div>
                                            </div>
                                            <button className="bg-purple-100 text-gray-800 px-4 py-1 rounded-full text-sm">
                                                Detail
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full flex items-center gap-2">
                                    <FiPlus /> Add Appointment
                                </button>
                            </div>

                            {/* Right Sidebar */}
                            <div className="w-1/3 space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-3">Appointment Stats Overview</h2>
                                    <StatBox stats={stats} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Share Booking Link</h2>
                                    <img
                                        src="qr.png"
                                        alt="QR Code"
                                        className="rounded-xl w-[328px] h-[276px]"
                                    />
                                    <div className="flex gap-2 mt-3">
                                        <button className="bg-gray-100 text-sm px-3 py-1 rounded">Copy Link</button>
                                        <button className="bg-purple-100 text-gray-900 text-sm px-3 py-1 rounded">
                                            Share on WhatsApp
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-md font-semibold mb-1">Patients by Type</h2>
                                    <p className="text-sm text-gray-700">Patient Types</p>
                                    <p className="text-2xl font-bold">480 Total Patients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
}

export default AppointmentsDashboard;
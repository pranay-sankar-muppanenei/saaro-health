import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { dropDownData as dummyData } from "../data/DropDownDummyData";
import Button from "../components/ui/Button";

const columns = [
    { label: "Entry Name", accessor: "name" },
    { label: "Section", accessor: "section" },
    { label: "Created By", accessor: "creator" },
    { label: "Actions", accessor: "action" },
];

const DropDownConfiguration = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(dummyData);

    const [formData, setFormData] = useState({
        name: "",
        section: "",
        creator: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: "" }); // Clear error on change
    };

    const validateForm = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "This field is required.";
            }
        });
        return newErrors;
    };

    const handleAddEntry = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newEntry = {
            ...formData,
            action: "Edit,Delete",
        };

        setData([newEntry, ...data]);

        // Reset form and close modal
        setFormData({ name: "", section: "", creator: "" });
        setErrors({});
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white overflow-y-auto">
                    <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Dropdown Configuration</h2>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#a381f0] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#8f6de1]"
                            >
                                + Add New Entry
                            </Button>
                        </div>

                        <div className="overflow-x-auto rounded-xl">
                            <GenericTable
                                columns={columns}
                                data={data}
                                renderCell={(row, accessor) => {
                                    if (accessor === "name") {
                                        return <span className="text-sm">{row[accessor]}</span>;
                                    }
                                    if (accessor === "action") {
                                        return (
                                            <span className="text-sm text-[#7c69a7] font-semibold">
                                                {row[accessor]}
                                            </span>
                                        );
                                    }
                                    return (
                                        <span className="text-md text-[#7c69a7]">{row[accessor]}</span>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </main>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>

                            <div className="grid grid-cols-1 gap-4">
                                {["name", "section", "creator"].map((field) => (
                                    <div key={field}>
                                        <input
                                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                            value={formData[field]}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            className="border px-3 py-2 rounded w-full"
                                        />
                                        {errors[field] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddEntry}
                                    className="px-4 py-2 bg-[#5e3bea] text-white rounded-md"
                                >
                                    Add Entry
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropDownConfiguration;

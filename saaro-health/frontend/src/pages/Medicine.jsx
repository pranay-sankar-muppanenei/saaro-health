import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { medicines as dummyMedicines } from "../data/MedicineDummyData";
import Button from "../components/ui/Button";

const columns = [
  { label: "Name", accessor: "name" },
  { label: "Composition", accessor: "composition" },
  { label: "Frequency", accessor: "frequency" },
  { label: "Dosage", accessor: "dosage" },
  { label: "Notes", accessor: "notes" },
  { label: "Created By", accessor: "createdBy" },
  { label: "Actions", accessor: "actions" },
];

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicinesList, setMedicinesList] = useState(dummyMedicines);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    composition: "",
    frequency: "",
    dosage: "",
    notes: "",
    createdBy: "",
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

  const handleSaveMedicine = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add actions field
    const newMedicine = {
      ...formData,
      actions: "Edit,Delete",
    };

    setMedicinesList([newMedicine, ...medicinesList]);

    // Reset form
    setFormData({
      name: "",
      composition: "",
      frequency: "",
      dosage: "",
      notes: "",
      createdBy: "",
    });
    setErrors({});
    setIsModalOpen(false);
  };

  const filteredMedicines = medicinesList.filter((row) => {
    return row.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Medicines</h2>
              <Button
                className="bg-[#7042D9] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e0dbf6]"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Medicine
              </Button>
            </div>

            <div className="relative w-full mb-4">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder=" Search Medicine"
                className="w-full pl-10 pr-4 py-2 border rounded-xl bg-[#f1ecf9] text-[#5e3bea] focus:outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <GenericTable
                columns={columns}
                data={filteredMedicines}
                renderCell={(row, accessor) => {
                  if (accessor === "name") {
                    return <span className="text-sm">{row[accessor]}</span>;
                  }
                  if (accessor === "actions") {
                    return (
                      <span className="text-sm text-[#7c69a7] font-semibold">
                        {row[accessor]}
                      </span>
                    );
                  }
                  return <span className="text-sm text-[#7c69a7]">{row[accessor]}</span>;
                }}
              />
            </div>
          </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Add Medicine</h2>

              <div className="grid grid-cols-1 gap-4">
                {["name", "composition", "frequency", "dosage", "notes", "createdBy"].map(
                  (field) => (
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
                  )
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMedicine}
                  className="px-4 py-2 bg-[#5e3bea] text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;

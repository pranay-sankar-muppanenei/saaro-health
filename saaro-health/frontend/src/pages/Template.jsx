import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import Button from '../components/ui/Button';

const initialData = [
  {
    name: "Template A",
    type: "Investigations",
    items: "Blood Test, Urine Analysis",
    creator: "Dr. Emily Carter",
    action: "Edit/Delete",
  },
  {
    name: "Template B",
    type: "Advice",
    items: "Dietary Recommendations, Exercise Plan",
    creator: "Dr. David Lee",
    action: "Edit/Delete",
  },
  {
    name: "Template C",
    type: "Medicine Set",
    items: "Antibiotics, Pain Relievers",
    creator: "Dr. Sarah Jones",
    action: "Edit/Delete",
  },
  {
    name: "Template D",
    type: "Investigations",
    items: "MRI Scan, X-Ray",
    creator: "Dr. Michael Brown",
    action: "Edit/Delete",
  },
  {
    name: "Template E",
    type: "Advice",
    items: "Stress Management Techniques, Sleep Hygiene",
    creator: "Dr. Olivia Green",
    action: "Edit/Delete",
  },
];

const columns = [
  { label: "Template Name", accessor: "name" },
  { label: "Type", accessor: "type" },
  { label: "Items", accessor: "items" },
  { label: "Created By", accessor: "creator" },
  { label: "Actions", accessor: "action" },
];

const Templates = () => {
  const [templateData, setTemplateData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', items: '', creator: '' });

  const handleCreateTemplate = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.name && formData.type && formData.items && formData.creator) {
      setTemplateData([...templateData, { ...formData, action: "Edit/Delete" }]);
      setFormData({ name: '', type: '', items: '', creator: '' });
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ name: '', type: '', items: '', creator: '' });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Templates</h2>
              <Button
                onClick={handleCreateTemplate}
                className="bg-[#f4f0fd] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e0dbf6]">
                + Create Template
              </Button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <GenericTable
                columns={columns}
                data={templateData}
                renderCell={(row, accessor) => (
                  <span className={accessor === "action" ? "text-sm text-[#7c69a7] font-semibold" : "text-md"}>
                    {row[accessor]}
                  </span>
                )}
              />
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Create Template</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Template Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Type"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="items"
                value={formData.items}
                onChange={handleInputChange}
                placeholder="Items"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="creator"
                value={formData.creator}
                onChange={handleInputChange}
                placeholder="Created By"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                onClick={handleCancel}
                className="text-white font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="text-blue-600 font-semibold"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;

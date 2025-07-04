import React, { act } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { templateData } from "../data/TemplateDummyData";

const columns = [
    { label: "Template Name", accessor: "name" },
    { label: "Type", accessor: "type" },
    { label: "Items", accessor: "items" },
    { label: "Created By", accessor: "creator" },
    { label: "Actions", accessor: "action" },
]

const Templates = () => {
    

    const handleCreateTemplate = () => {
        console.log("Create Template button clicked");      
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white overflow-y-auto">
                    <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Templates</h2>
                            <button 
                            onClick={handleCreateTemplate}
                            className="bg-[#f4f0fd] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e0dbf6]">
                                + Create Template
                            </button>
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <GenericTable
                                columns={columns}
                                data={templateData}
                                
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Templates;

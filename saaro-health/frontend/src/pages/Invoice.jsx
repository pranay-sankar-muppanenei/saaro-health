import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import KPISection from "../components/ui/KpiSection";
import GenericTable from "../components/ui/GenericTable";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { INVOICE_KPIS, invoicesData as initialInvoicesData } from "../data/InvoiceDummyData";

const dateOptions = ["All", "Last 30 days", "Last 90 days"];
const statusOptions = ["All", "Paid", "Unpaid", "Partially Paid"];
const modeOptions = ["All", "Cash", "UPI", "Card", "Insurance"];

const columns = [
  { label: "Invoice ID", accessor: "id" },
  { label: "Patient Name", accessor: "name" },
  { label: "Date of Invoice", accessor: "date" },
  { label: "Amount (₹)", accessor: "amount" },
  { label: "Status", accessor: "status" },
  { label: "Payment Mode", accessor: "mode" },
  { label: "Actions", accessor: "action" },
];

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [invoicesData, setInvoicesData] = useState(initialInvoicesData);

  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    phone: "",
    paymentStatus: "Billed",
    privateNotes: "",
    services: [{ service: "", qty: 1, amount: 0, discount: 0 }],
    additionalDiscount: "",
    paymentMode: "Cash",
    patientNote: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;

    if (field === "service" && value && index === formData.services.length - 1) {
      updatedServices.push({ service: "", qty: 1, amount: 0, discount: 0 });
    }

    setFormData({ ...formData, services: updatedServices });
  };

  const handleCreateInvoice = () => {
    if (formData.name.trim().length < 3) {
      alert("Name should be at least 3 characters long");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const total = formData.services.reduce((sum, s) => {
      return sum + (s.qty * s.amount - s.discount);
    }, 0) - parseFloat(formData.additionalDiscount || 0);

    const newInvoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      date: new Date().toISOString().split("T")[0],
      amount: total,
      status: formData.paymentStatus,
      mode: formData.paymentMode,
    };

    setInvoicesData([newInvoice, ...invoicesData]);
    setIsModalOpen(false);
    setFormData({
      uid: "",
      name: "",
      phone: "",
      paymentStatus: "Billed",
      privateNotes: "",
      services: [{ service: "", qty: 1, amount: 0, discount: 0 }],
      additionalDiscount: "",
      paymentMode: "Cash",
      patientNote: "",
    });
  };

  const filteredInvoices = invoicesData.filter((invoice) => {
    const searchMatch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.name.toLowerCase().includes(searchTerm.toLowerCase());

    const today = new Date();
    const invoiceDate = new Date(invoice.date);
    let dateMatch = true;

    if (dateFilter === "Last 30 days") {
      const past = new Date();
      past.setDate(today.getDate() - 30);
      dateMatch = invoiceDate >= past;
    } else if (dateFilter === "Last 90 days") {
      const past = new Date();
      past.setDate(today.getDate() - 90);
      dateMatch = invoiceDate >= past;
    }

    const statusMatch = statusFilter === "All" || invoice.status === statusFilter;
    const modeMatch = modeFilter === "All" || invoice.mode === modeFilter;

    return searchMatch && dateMatch && statusMatch && modeMatch;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-[#322e45]">Invoices</h1>
              <button
                className="bg-[#5e3bea] hover:bg-[#472dc4] text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
                onClick={() => setIsModalOpen(true)}
              >
                + Create Invoice
              </button>
            </div>

            <KPISection kpis={INVOICE_KPIS} />

            <GenericTable
              columns={columns}
              data={filteredInvoices}
              renderCell={(row, accessor) => {
                if (accessor === "status") {
                  return <span className="text-sm px-3 py-1">{row.status}</span>;
                }
                if (["name", "mode", "date"].includes(accessor)) {
                  return <span className="text-sm text-[#69598C] px-3 py-1">{row[accessor]}</span>;
                }
                if (accessor === "action") {
                  return (
                    <Link to={`/invoice/${row.id}`}>
                      <button className="text-[#5e3bea] hover:underline text-sm font-medium">View</button>
                    </Link>
                  );
                }
                return <span className="text-sm text-gray-800">{row[accessor]}</span>;
              }}
            />
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#fefefe] rounded-xl shadow-xl w-full max-w-5xl p-8 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-[#322e45]">Create Invoice</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input placeholder="UID" className="border border-gray-300 px-4 py-2 rounded-md" value={formData.uid} onChange={(e) => handleInputChange("uid", e.target.value)} />
                <input placeholder="Name" className="border border-gray-300 px-4 py-2 rounded-md" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                <input placeholder="Phone" className="border border-gray-300 px-4 py-2 rounded-md" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                <select className="border border-gray-300 px-4 py-2 rounded-md" value={formData.paymentStatus} onChange={(e) => handleInputChange("paymentStatus", e.target.value)}>
                  <option>Billed</option>
                  <option>Unbilled</option>
                  <option>Partially Paid</option>
                </select>
                <input placeholder="Private Notes" className="border border-gray-300 px-4 py-2 rounded-md col-span-full" value={formData.privateNotes} onChange={(e) => handleInputChange("privateNotes", e.target.value)} />
              </div>

              <div className="mt-8">
                <div className="grid grid-cols-4 gap-4 font-medium text-sm text-gray-600 mb-2">
                  <span>Service</span>
                  <span>Qty</span>
                  <span>Amount</span>
                  <span>Discount</span>
                </div>
                {formData.services.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 mb-2">
                    <input placeholder="Service" className="border border-gray-300 px-3 py-2 rounded-md" value={s.service} onChange={(e) => handleServiceChange(idx, "service", e.target.value)} />
                    <input placeholder="Qty" type="number" className="border border-gray-300 px-3 py-2 rounded-md" value={s.qty} onChange={(e) => handleServiceChange(idx, "qty", parseInt(e.target.value) || 0)} />
                    <input placeholder="Amount" type="number" className="border border-gray-300 px-3 py-2 rounded-md" value={s.amount} onChange={(e) => handleServiceChange(idx, "amount", parseFloat(e.target.value) || 0)} />
                    <input placeholder="Discount" type="number" className="border border-gray-300 px-3 py-2 rounded-md" value={s.discount} onChange={(e) => handleServiceChange(idx, "discount", parseFloat(e.target.value) || 0)} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <input placeholder="Additional Discount" type="number" className="border border-gray-300 px-4 py-2 rounded-md" value={formData.additionalDiscount} onChange={(e) => handleInputChange("additionalDiscount", e.target.value)} />
                <select className="border border-gray-300 px-4 py-2 rounded-md" value={formData.paymentMode} onChange={(e) => handleInputChange("paymentMode", e.target.value)}>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>UPI</option>
                  <option>Online</option>
                </select>
              </div>

              <textarea placeholder="Patient Note" className="border border-gray-300 px-4 py-2 rounded-md mt-4 w-full resize-none" value={formData.patientNote} onChange={(e) => handleInputChange("patientNote", e.target.value)} />

              <div className="flex justify-end gap-4 mt-8">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
                <button onClick={handleCreateInvoice} className="px-5 py-2 bg-[#5e3bea] text-white rounded-md hover:bg-[#472dc4] shadow">Create Invoice</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;

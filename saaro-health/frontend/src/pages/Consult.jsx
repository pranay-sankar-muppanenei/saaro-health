import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/SideBar';
import Header from '../components/layout/Header';
import GenericTable from '../components/ui/GenericTable';
import { medicineData } from '../data/ConsultDummyData';
import { rxData } from '../data/RxDummyData';

const columns = [
  { label: 'Medicine', accessor: 'medicine' },
  { label: 'Dosage', accessor: 'dosage' },
  { label: 'Frequency', accessor: 'frequency' },
  { label: 'Duration', accessor: 'duration' },
  { label: 'Notes', accessor: 'notes' },
];

const ConsultationForm = () => {
  const { id } = useParams();
  const patient = rxData.find((p) => p.uid === id);

  const [formData, setFormData] = useState({
    vitals: {
      bp: '', pulse: '', height: '', weight: '', temperature: '', spo2: '', rbs: ''
    },
    complaints: ['', '', ''],
    pastHistory: '',
    surgicalHistory: '',
    drugAllergy: '',
    physicalExamination: ['', '', ''],
    diagnosis: {
      provisional: ['', ''],
      final: ['', '']
    },
    tests: ['', ''],
    testNotes: ['', ''],
    advice: '',
    followUp: ['', '']
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="max-w-6xl mx-auto space-y-6 font-sans text-sm">
              <div className="text-xl font-semibold">
                <div className='flex flex-row justify-between'>
                  <div>
                    <h1 className='text-2xl font-semibold'>Consultation for {patient?.name || "Unknown"}</h1>
                    <p className='text-sm text-[#69578F] text-400'>
                      UID: {patient?.uid || "N/A"} | Name: {patient?.name || "N/A"} | Age: {patient?.age || "N/A"}
                    </p>
                  </div>
                  <img
                    src={patient?.img || "/Ava Evans.png"}
                    alt="Patient"
                    className="h-[160px] w-[300px] object-cover rounded"
                  />
                </div>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(formData.vitals).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 font-medium">{key.toUpperCase()}</label>
                    <input
                      value={value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vitals: { ...formData.vitals, [key]: e.target.value }
                        })
                      }
                      placeholder={key.toUpperCase()}
                      className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                    />
                  </div>
                ))}
              </div>

              {/* Chief Complaints */}
              <div>
                <div className="font-semibold mb-2">Chief Complaints</div>
                {formData.complaints.map((complaint, i) => (
                  <div key={i} className="flex flex-col mt-2">
                    <label className="mb-1 font-medium">Complaint {i + 1}</label>
                    <input
                      value={complaint}
                      onChange={(e) => {
                        const updated = [...formData.complaints];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, complaints: updated });
                      }}
                      placeholder="Enter Complaint"
                      className="border p-2 rounded bg-gray-100 placeholder-[#69578F]" 
                    />
                  </div>
                ))}
              </div>

              {/* Medical History */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Past History</label>
                  <input
                    value={formData.pastHistory}
                    onChange={(e) => setFormData({ ...formData, pastHistory: e.target.value })}
                    placeholder="Enter past medical history"
                    className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Surgical History</label>
                  <input
                    value={formData.surgicalHistory}
                    onChange={(e) => setFormData({ ...formData, surgicalHistory: e.target.value })}
                    placeholder="Enter surgical history"
                    className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Drug Allergy</label>
                  <input
                    value={formData.drugAllergy}
                    onChange={(e) => setFormData({ ...formData, drugAllergy: e.target.value })}
                    placeholder="Enter drug allergies"
                    className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                  />
                </div>
              </div>

              {/* Physical Examination */}
              <div>
                <div className="font-semibold mb-2">Physical Examination</div>
                {formData.physicalExamination.map((exam, i) => (
                  <div key={i} className="flex flex-col mt-2">
                    <label className="mb-1 font-medium">Observation {i + 1}</label>
                    <input
                      value={exam}
                      onChange={(e) => {
                        const updated = [...formData.physicalExamination];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, physicalExamination: updated });
                      }}
                      placeholder="Enter Observation"
                      className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                    />
                  </div>
                ))}
              </div>

              {/* Diagnosis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold mb-2">Provisional Diagnosis</div>
                  {formData.diagnosis.provisional.map((text, i) => (
                    <div key={i} className="flex flex-col mt-2">
                      <label className="mb-1 font-medium">Provisional {i + 1}</label>
                      <input
                        value={text}
                        onChange={(e) => {
                          const updated = [...formData.diagnosis.provisional];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            diagnosis: { ...formData.diagnosis, provisional: updated }
                          });
                        }}
                        placeholder="Enter Provisional Diagnosis"
                        className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold mb-2">Final Diagnosis</div>
                  {formData.diagnosis.final.map((text, i) => (
                    <div key={i} className="flex flex-col mt-2">
                      <label className="mb-1 font-medium">Final {i + 1}</label>
                      <input
                        value={text}
                        onChange={(e) => {
                          const updated = [...formData.diagnosis.final];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            diagnosis: { ...formData.diagnosis, final: updated }
                          });
                        }}
                        placeholder="Enter Final Diagnosis"
                        className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Investigations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.tests.map((test, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 font-medium">Test {i + 1}</label>
                    <input
                      value={test}
                      onChange={(e) => {
                        const updated = [...formData.tests];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, tests: updated });
                      }}
                      placeholder="Enter Test"
                      className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                    />
                  </div>
                ))}
                {formData.testNotes.map((note, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 font-medium">Test Note {i + 1}</label>
                    <input
                      value={note}
                      onChange={(e) => {
                        const updated = [...formData.testNotes];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, testNotes: updated });
                      }}
                      placeholder="Note for Lab"
                      className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                    />
                  </div>
                ))}
              </div>

              {/* Medication Table */}
              <div>
                <div className="font-semibold mb-2">Medication / Prescription</div>
                <GenericTable columns={columns} data={medicineData} />
              </div>

              {/* Advice */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Advice</label>
                <textarea
                  value={formData.advice}
                  onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                  placeholder="Enter advice"
                  className="w-full border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                  rows={6}
                />
              </div>

              {/* Follow-up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.followUp.map((val, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="mb-1 font-medium">Follow-up after</label>
                    <input
                      type="date"
                      value={val}
                      placeholder="Select Date"
                      onChange={(e) => {
                        const updated = [...formData.followUp];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, followUp: updated });
                      }}
                      className="border p-2 rounded bg-gray-100 placeholder-[#69578F]"
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-2xl">Save & Finalize</button>
                <button className="bg-gray-200 px-4 py-2 rounded">Print Prescription</button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-2xl ml-auto">Send via WhatsApp</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsultationForm;

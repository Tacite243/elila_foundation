"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setJobOffers, deleteJobOffer, JobOfferWithApplications } from "@/redux/slices/jobOffersSlice";
import { Edit, Trash2, PlusCircle, Users } from "lucide-react";
import JobOfferFormModal from './JobOfferFormModal'; 

interface JobOfferManagerProps {
  initialJobOffers: JobOfferWithApplications[];
}

export default function JobOfferManager({ initialJobOffers }: JobOfferManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items: jobOffers, mutationStatus } = useSelector((state: RootState) => state.jobOffers);

  useEffect(() => {
    dispatch(setJobOffers(initialJobOffers));
  }, [dispatch, initialJobOffers]);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      dispatch(deleteJobOffer(id));
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gérer les Offres d&apos;Emploi</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white flex items-center px-4 py-2 rounded-md hover:bg-green-700"
        >
          <PlusCircle className="mr-2" />
          Nouvelle Offre
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Titre</th>
              <th className="text-left p-2">Statut</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Candidatures</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobOffers.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">{job.title}</td>
                <td className="p-2">{job.isPublished ? 'Publiée' : 'Brouillon'}</td>
                <td className="p-2">{job.employmentType}</td>
                <td className="p-2 flex items-center">
                    <Users size={16} className="mr-1 text-gray-500" />
                    {job.applications.length}
                </td>
                <td className="p-2 flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(job.id)} disabled={mutationStatus === 'loading'} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <JobOfferFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
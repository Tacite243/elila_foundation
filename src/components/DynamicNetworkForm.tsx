
'use client';

import dynamic from 'next/dynamic';



const NetworkForm = dynamic(
  () => import('@/components/NetworkForm'), 
  {
    loading: () => <p className="text-center p-8">Chargement du formulaire...</p>,
    ssr: false
  }
);


export default function DynamicNetworkForm() {
  return <NetworkForm />;
}
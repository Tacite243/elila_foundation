import Image from 'next/image';

export default function SiteLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[100]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-20 h-20">
          {/* Utilise l'animation "spin" de Tailwind pour une rotation simple et propre */}
          <Image
            src="/icon.png"
            alt="Chargement du site We Lead to Africa"
            width={80}
            height={80}
            className="animate-spin"
            priority
          />
        </div>
        <p className="text-gray-600 text-sm">Chargement...</p>
      </div>
    </div>
  );
}
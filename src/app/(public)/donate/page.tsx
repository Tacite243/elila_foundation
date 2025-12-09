// src/app/(public)/donate/page.tsx
export default function DonatePage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Soutenez Notre Mission</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Votre contribution, quelle qu&apos;elle soit, est essentielle pour la pérennité de nos actions. Chaque don nous aide à financer nos programmes de formation, nos actions sociales et nos événements.
                    </p>
                    <div className="mt-10">
                        <a
                            href="#" // Mettez ici le lien vers votre plateforme de don (ex: PayPal, GoFundMe)
                            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Faire un don en ligne
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
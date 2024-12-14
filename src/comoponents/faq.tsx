'use cleint'

import React, { useState, useEffect } from 'react';
import AOS from 'aos';

const FAQ = () => {
    const [showMore, setShowMore] = useState(false);
    const faqItems = [
        { id: 1, question: "Qu’est-ce que la Elila Foundation ?", answer: "La Elila Foundation est une organisation dédiée au développement socioéconomique, culturel, et politique de l’espace Lega, couvrant les territoires de Mwenga, Shabunda, Pangi et Walikale, ainsi que la diaspora Lega à travers le monde." },
        { id: 2, question: "Quelle est la mission de la Fondation ?", answer: "La mission de la Elila Foundation est de promouvoir l’émergence du peuple Lega en valorisant ses richesses culturelles, en stimulant le développement économique, et en renforçant son rôle dans les débats scientifiques, sociaux et politiques." },
        { id: 3, question: "Quels sont les objectifs principaux de la Fondation ?", answer: "Protéger et promouvoir la culture Lega, notamment à travers le système du Bwami et d’autres traditions. Mobiliser les ressources humaines et financières pour soutenir des projets de développement dans les 4 territoires. Encourager la diaspora Lega à participer activement au progrès de leur communauté d’origine. Défendre les intérêts de l’espace Lega auprès des instances politiques et économiques." },
        { id: 4, question: "Quelles sont les richesses des territoires de Mwenga, Shabunda, Pangi et Walikale ?", answer: "Richesses culturelles : Le Bwami, les chants, danses, et savoir-faire artisanaux. Ressources naturelles : L’or, le coltan, le bois et les terres fertiles. Potentiel touristique : Parcs naturels, sites culturels et paysages spectaculaires. Opportunités économiques : Agriculture, exploitation durable des minerais, tourisme, et énergie." },
        { id: 5, question: "Quels sont les secteurs porteurs pour les investissements ?", answer: "Les secteurs clés incluent l’agriculture, les énergies renouvelables, les infrastructures, le tourisme, et la transformation des produits locaux." },
        { id: 6, question: "Comment la diaspora Lega peut-elle contribuer au développement des territoires ?", answer: "En investissant dans des projets structurants. En partageant des compétences et des innovations technologiques. En soutenant les initiatives politiques et économiques locales." },
        { id: 7, question: "Quels sont les projets phares de la Elila Foundation ?", answer: "Soutien aux projets éducatifs et culturels. Promotion d’une exploitation minière durable et responsable. Développement de programmes touristiques. Mobilisation des jeunes pour des initiatives entrepreneuriales." },
        { id: 8, question: "Comment participer aux activités de la Fondation ?", answer: "Vous pouvez participer en : Devenant membre ou bénévole. Finançant ou soutenant un projet spécifique. Partageant vos compétences ou connaissances." },
        { id: 9, question: "Comment contacter la Elila Foundation ?", answer: " Vous pouvez nous contacter via : Email : contact@elilafoundation.org, Téléphone : +243 990 868 155" },
        { id: 10, question: "Quels sont les engagements de la Fondation envers les élus locaux et la politique ?", answer: "La Elila Foundation travaille en collaboration avec les élus locaux pour : Promouvoir une gouvernance transparente. Renforcer les infrastructures et les services publics. Mobiliser des ressources pour le développement des territoires." }
    ];
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        if (openFAQ === id) {
            setOpenFAQ(null);
        } else {
            setOpenFAQ(id);
        }
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            AOS.init();
        }
    }, []);

    return (
        <section id="faq" className="faq section light-background">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="content px-xl-5">
                            <h3><strong style={{color: "#ff0000"}}>Questions</strong><br /><span>Fréquemment posées</span></h3>
                            <p>Cette FAQ reflète notre vision et nos actions pour contribuer à un avenir prospère et durable pour l’espace Lega.</p>
                        </div>
                    </div>

                    <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
                        <div className="faq-container">
                            {faqItems.slice(0, 4).map(item => (
                                <div key={item.id} className={`faq-item ${openFAQ === item.id ? 'faq-active' : ''}`}>
                                    <h3 onClick={() => toggleFAQ(item.id)}>
                                        <span className="num">{item.id}.</span> <span>{item.question}</span>
                                    </h3>
                                    {openFAQ === item.id && (
                                        <div className="faq-content">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                    <i className="faq-toggle bi bi-chevron-right"></i>
                                </div>
                            ))}
                            {showMore && faqItems.slice(4).map(item => (
                                <div key={item.id} className={`faq-item ${openFAQ === item.id ? 'faq-active' : ''}`}>
                                    <h3 onClick={() => toggleFAQ(item.id)}>
                                        <span className="num">{item.id}.</span> <span>{item.question}</span>
                                    </h3>
                                    {openFAQ === item.id && (
                                        <div className="faq-content">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                    <i className="faq-toggle bi bi-chevron-right"></i>
                                </div>
                            ))}
                            <button
                                className='showmore'
                                onClick={handleShowMore}
                            >
                                {showMore ? ' moins...' : 'voir plus...'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

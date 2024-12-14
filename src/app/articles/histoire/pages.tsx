"use client"

import ArticleFormat from "@/comoponents/articleFormat";


export default function Histoire() {
    const HistoireData = {
        title: "Histoire du Peuple Lega",
        underTitle: "Origines et Répartition",
        description: "Le peuple Lega, également connu sous le nom de Warega, est un groupe ethnique originaire de l’est de la République Démocratique du Congo, principalement présent dans les territoires de Mwenga, Shabunda, Pangi et Walikale. Ce peuple, riche en traditions et en culture, a également des représentants dans la diaspora, établis dans d'autres villes congolaises et à l'étranger",
        content: {
            section: "Origines et Migration: L'histoire des Léga remonte à des siècles et s’enracine dans les grandes migrations bantoues. Les Léga seraient arrivés dans leur espace actuel en suivant les cours d’eau, notamment la rivière Elila, qui traverse plusieurs des territoires qu’ils occupent aujourd'hui. Leur installation dans des zones forestières et montagneuses leur a permis de développer une économie basée sur la chasse, la pêche, et l’agriculture, tout en protégeant leur identité face aux influences extérieures. Organisation Sociale et Politique : Le peuple Lega est structuré autour de la famille élargie, des clans et de l’association secrète Bwami, qui joue un rôle central dans la gouvernance sociale et spirituelle. Le Bwami : Ce système initiatique transmet des valeurs de sagesse, de justice et de cohésion communautaire. Il permet également de réguler les conflits et de préserver l’harmonie sociale. Les Clans : Les Léga sont regroupés en différents clans, qui servent de base à leur organisation sociale, avec des chefs coutumiers jouant un rôle de médiateurs.",
            section1: "Territoires Occupés : 1. Mwenga : Ce territoire, traversé par de nombreuses rivières, est le cœur culturel du peuple Lega. Les traditions y sont bien préservées, notamment à travers les cérémonies initiatiques du Bwami. 2. Shabunda : Connu pour ses vastes forêts, Shabunda est un bastion de l’agriculture et de la chasse pour les Léga. Les rivières de cette région facilitent également les échanges avec d'autres groupes. 3. Pangi : Ce territoire est célèbre pour ses richesses naturelles, notamment le coltan et l’or. Les Léga y développent une économie artisanale tout en préservant leurs traditions. 4. Walikale : Situé à la lisière des forêts denses, Walikale est un territoire stratégique pour le peuple Lega. Bien que multiethnique, les Léga y maintiennent une forte présence culturelle. Les Léga de la Diaspora : Avec le temps, les Léga ont migré vers d’autres parties du Congo et au-delà, notamment dans les villes comme Bukavu, Goma, Kinshasa et Lubumbashi. À l’international, les Léga se trouvent en Afrique de l’Est, en Europe et en Amérique du Nord. Malgré la distance, ils restent attachés à leurs racines culturelles et participent activement aux activités communautaires, souvent à travers des associations. Défis et Perspectives: Le peuple Lega fait face à des défis tels que : La déforestation et l’exploitation des ressources naturelles dans leurs territoires. L’influence de la modernité qui menace certaines traditions. Les conflits armés qui affectent leurs régions. Cependant, grâce à leur résilience et leur sens de l’organisation, les Léga travaillent à préserver leur identité et à promouvoir leur culture, que ce soit dans les territoires ancestraux ou dans la diaspora. Le peuple Lega est un exemple de cohésion, de sagesse et d’attachement aux valeurs ancestrales, malgré les évolutions et les défis du monde moderne."
        },
        imgSource: "/53bdd3c827641fa6746d9c49ccf61f6d.jpg"
    }
    return (
        <ArticleFormat 
            title={HistoireData.title} 
            underTitle={HistoireData.underTitle} 
            description={HistoireData.description} 
            content={HistoireData.content} 
            imgSource={HistoireData.imgSource}
        />
    )
}
"use client"

import ArticleFormat from "@/comoponents/articleFormat";


export default function Spirituality() {
    const SpiritualityData = {
        title: "La Spiritualité chez le Peuple Lega",
        underTitle: "Un Lien Sacré avec le Divin et la Nature",
        description: "La spiritualité occupe une place centrale dans la vie du peuple Lega, structurant leur vision du monde et leurs interactions sociales. Profondément ancrée dans les croyances ancestrales, elle repose sur une connexion étroite avec les esprits, les ancêtres et les forces de la nature.",
        content: {
            section: "Croyances Fondamentales: Les Léga croient en un être suprême, souvent perçu comme le créateur et garant de l’ordre universel. Ce dieu est vénéré de manière indirecte, à travers les ancêtres, qui servent d’intermédiaires entre les vivants et le divin. Rites et Pratiques: Les Offrandes : Les Léga offrent des sacrifices d’animaux, de nourriture ou de boissons pour apaiser les ancêtres ou demander des bénédictions. Les Masques et Symboles : Les masques Lega, utilisés dans les cérémonies initiatiques et spirituelles, incarnent la sagesse et la protection des ancêtres. Les Conseils des Aînés : Les anciens jouent un rôle spirituel, interprétant les signes et guidant la communauté dans les moments critiques.",
            section1: "Harmonie avec la Nature : Les Léga considèrent la nature comme sacrée. Les forêts, rivières et montagnes sont souvent associées à des esprits protecteurs, et leur préservation est une responsabilité collective. Persistance et Modernité : Malgré les influences modernes et religieuses, la spiritualité Léga demeure vivante, transmise à travers les rites et les enseignements des anciens. Elle continue d’être un pilier de l’identité culturelle, unissant la communauté autour de valeurs de respect, d’humilité et de solidarité.",
        },
        imgSource: "/53bdd3c827641fa6746d9c49ccf61f6d.jpg"
    }
    return (
        <ArticleFormat 
            title={SpiritualityData.title} 
            underTitle={SpiritualityData.underTitle} 
            description={SpiritualityData.description} 
            content={SpiritualityData.content} 
            imgSource={SpiritualityData.imgSource}
        />
    )
}
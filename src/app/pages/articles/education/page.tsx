"use client"

import ArticleFormat from "@/comoponents/articleFormat";


export default function Education() {
    const EducationData = {
        title: "L’Initiation (Lutende) chez le Peuple Lega",
        underTitle: "Un Rite de Passage Sacré",
        description: "Le Lutende n’est pas simplement un événement, mais un processus sacré et éducatif. Il symbolise l’intégration de l’individu dans la société adulte, avec ses droits et ses devoirs. Ce rite vise à former des citoyens respectueux des traditions, prêts à assumer leur rôle au sein de la communauté.",
        content: {
            section: "Les Étapes du Lutende 1. La Séparation : Les initiés, souvent des adolescents, sont temporairement séparés de leurs familles et emmenés dans un lieu sacré, souvent en forêt ou dans un camp isolé. Cette séparation marque la transition vers une nouvelle phase de vie. 2. L’Enseignement des Valeurs : Les initiés reçoivent des enseignements des aînés et des sages. Ces leçons portent sur : Les valeurs sociales : respect, solidarité, et responsabilités communautaires. Les secrets de la nature : connaissance des plantes, des animaux et des cycles de la vie. Les coutumes et les lois : transmission des traditions ancestrales.",
            section1: "La Cérémonie La cérémonie elle-même est un moment festif et solennel. Elle réunit les deux familles et la communauté, souvent autour d’une célébration où se mêlent chants, danses et repas traditionnels. Les anciens, garants de la culture, jouent un rôle important en transmettant des bénédictions et des conseils au jeune couple. Par ailleurs, les symboles tels que le partage de la bière locale 'lubugwa' ou l’échange de bracelets et colliers traditionnels marquent l’union et la communion entre les deux familles. Valeurs et Enseignements: Le mariage coutumier chez les Léga valorise : La solidarité familiale : L’union des deux individus renforce les liens intercommunautaires. Le respect des traditions : Chaque étape, de la demande à la dot, est réalisée dans le strict respect des coutumes ancestrales. La transmission culturelle : Les cérémonies sont une occasion de perpétuer les valeurs du peuple Léga, notamment la fidélité, l’humilité, et le respect des aînés. Évolution et Défis : Avec le temps, les mariages coutumiers Léga ont évolué, intégrant parfois des éléments modernes. Cependant, certains défis, tels que la cherté de la dot ou l’influence des normes extérieures, posent des questions sur l’équilibre entre tradition et modernité. Le mariage coutumier Léga reste un pilier de l’identité culturelle du peuple et un témoignage vivant de son attachement à ses racines et valeurs."
        },
        imgSource: "/images (5).jpeg"
    }
    return (
        <ArticleFormat 
            title={EducationData.title} 
            underTitle={EducationData.underTitle} 
            description={EducationData.description} 
            content={EducationData.content} 
            imgSource={EducationData.imgSource}
        />
    )
}
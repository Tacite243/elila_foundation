import ArticleFormat from "@/comoponents/articleFormat";


export default function Notabilite() {
    const NotabilityData = {
        title: "Le Mariage Coutumier chez le Peuple Lega",
        underTitle: "Une Célébration de Lien et de Valeurs",
        description: "Le mariage coutumier chez le peuple Lega, originaire des territoires de Mwenga, Shabunda, Pangi et Walikale, est un rite profondément ancré dans les traditions et les valeurs culturelles. Il symbolise non seulement l’union entre deux individus, mais aussi l’établissement de liens solides entre deux familles et communautés.",
        content: {
            section: "Étapes Préparatoires au Mariage <br />1. L’identification de la future épouse : Le processus commence souvent par l'implication des parents et proches du futur marié, qui jouent un rôle clé dans l’identification d’une femme au comportement exemplaire, respectueuse des traditions et des valeurs Léga. <br />2. La démarche du 'Kuomba' : Le prétendant, accompagné de ses parents ou d’un médiateur, rend visite à la famille de la jeune femme pour exprimer son intention de se marier. Cette première rencontre est marquée par des échanges symboliques pour démontrer le sérieux de la demande. <br />3. La dot (\'Bukele\') : Un élément central du mariage coutumier Léga est la remise de la dot. Elle peut inclure des objets traditionnels tels que du sel, des tissus, du bétail, ou des biens modernes comme de l’argent. La dot est un signe de respect envers la famille de l’épouse et marque l’engagement du marié.",
            section1: "La Cérémonie La cérémonie elle-même est un moment festif et solennel. Elle réunit les deux familles et la communauté, souvent autour d’une célébration où se mêlent chants, danses et repas traditionnels. Les anciens, garants de la culture, jouent un rôle important en transmettant des bénédictions et des conseils au jeune couple. Par ailleurs, les symboles tels que le partage de la bière locale 'lubugwa' ou l’échange de bracelets et colliers traditionnels marquent l’union et la communion entre les deux familles. Valeurs et Enseignements: Le mariage coutumier chez les Léga valorise : La solidarité familiale : L’union des deux individus renforce les liens intercommunautaires. Le respect des traditions : Chaque étape, de la demande à la dot, est réalisée dans le strict respect des coutumes ancestrales. La transmission culturelle : Les cérémonies sont une occasion de perpétuer les valeurs du peuple Léga, notamment la fidélité, l’humilité, et le respect des aînés. Évolution et Défis : Avec le temps, les mariages coutumiers Léga ont évolué, intégrant parfois des éléments modernes. Cependant, certains défis, tels que la cherté de la dot ou l’influence des normes extérieures, posent des questions sur l’équilibre entre tradition et modernité. Le mariage coutumier Léga reste un pilier de l’identité culturelle du peuple et un témoignage vivant de son attachement à ses racines et valeurs."
        },
        imgSource: "/nuptiae.jpg"
    }
    return (
        <ArticleFormat 
            title={NotabilityData.title} 
            underTitle={NotabilityData.underTitle} 
            description={NotabilityData.description} 
            content={NotabilityData.content} 
            imgSource={NotabilityData.imgSource}
        />
    )
}
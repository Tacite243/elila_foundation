

// Fonction pour générer un slug à partir d'une chaîne de caractères
export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Remplace les espaces par -
        .replace(/[^\w\-]+/g, '')       // Supprime les caractères non valides
        .replace(/\-\-+/g, '-')         // Remplace plusieurs - par un seul
};

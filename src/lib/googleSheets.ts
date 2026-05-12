import { google } from 'googleapis';

// On définit le type de données qu'on va renvoyer au Dashboard
export type IdentificationStats = {
    totalRespondents: number;
    territoryDistribution: { name: string; count: number; percentage: number }[];
};

export async function getIdentificationStats(): Promise<IdentificationStats> {
    try {
        // --- AJOUTEZ CE TEST ICI ---
        console.log("--- TEST GOOGLE ENV ---");
        console.log("Email :", process.env.GOOGLE_CLIENT_EMAIL);
        console.log("Clé présente ? :", !!process.env.GOOGLE_PRIVATE_KEY);
        console.log("-----------------------");

        // 1. Authentification avec le "Robot"
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                // Petite astuce : on remplace les \\n par de vrais sauts de ligne pour que la clé marche
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const range = "'Réponses au formulaire 1'!A2:F";

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: range,
        });

        const rows = response.data.values;

        // Si pas de données, on renvoie des zéros
        if (!rows || rows.length === 0) {
            return { totalRespondents: 0, territoryDistribution: [] };
        }

        // 3. Calculs
        const totalRespondents = rows.length;
        const territoryMap: { [key: string]: number } = {};

        rows.forEach((row) => {
            // La colonne F (Territoire) est l'index 5 (0=A, 1=B, ..., 5=F)
            // On nettoie le texte (majuscules, espaces) pour éviter les doublons
            const territory = row[5] ? row[5].trim().toUpperCase() : 'NON DÉFINI';

            // On compte +1 pour ce territoire
            territoryMap[territory] = (territoryMap[territory] || 0) + 1;
        });

        // 4. Transformation en tableau propre et trié
        const territoryDistribution = Object.entries(territoryMap)
            .map(([name, count]) => ({
                name,
                count,
                percentage: Math.round((count / totalRespondents) * 100),
            }))
            .sort((a, b) => b.count - a.count) // On met les plus grands chiffres en premier
            .slice(0, 5); // On garde seulement le Top 5 pour l'affichage

        return {
            totalRespondents,
            territoryDistribution,
        };

    } catch (error) {
        console.error('Erreur Google Sheets:', error);
        // En cas d'erreur, on ne fait pas planter le site, on renvoie 0
        return { totalRespondents: 0, territoryDistribution: [] };
    }
}
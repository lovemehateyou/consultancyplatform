/** Cities and sub-cities / districts commonly used for business addresses in Ethiopia. */
export const ETHIOPIA_CITY_SUBCITIES: Record<string, readonly string[]> = {
	"Addis Ababa": [
		"Addis Ketema",
		"Akaki Kaliti",
		"Arada",
		"Bole",
		"Gulele",
		"Kirkos",
		"Kolfe Keranio",
		"Lideta",
		"Lemi Kura",
		"Nifas Silk-Lafto",
		"Yeka",
	],
	Adama: ["Adama Town", "Dembela", "Geda", "Lugo", "Woreda 01", "Woreda 02", "Other"],
	"Ambo": ["Ambo Town", "City Center", "Other"],
	"Arba Minch": ["Arba Minch Town", "Sikela", "Shecha", "Other"],
	Assosa: ["Assosa Town", "City Center", "Other"],
	Axum: ["Axum Town", "City Center", "Other"],
	"Bahir Dar": [
		"Belay Zeleke",
		"Dagmawi Minilik",
		"Facho",
		"Gish Abay",
		"Hidar 11",
		"Piazza",
		"Shumabo",
		"Other",
	],
	Bishoftu: ["Bishoftu Town", "Debre Zeit", "City Center", "Other"],
	Burayu: ["Burayu Town", "City Center", "Other"],
	"Debre Birhan": ["Debre Birhan Town", "City Center", "Other"],
	"Debre Markos": ["Debre Markos Town", "City Center", "Other"],
	Dessie: ["Dessie Town", "City Center", "Other"],
	Dilla: ["Dilla Town", "City Center", "Other"],
	"Dire Dawa": [
		"Dechatu",
		"Gende Kore",
		"Goro",
		"Melka Jebdu",
		"Sabian",
		"Wahil",
		"Other",
	],
	Gambela: ["Gambela Town", "City Center", "Other"],
	Goba: ["Goba Town", "City Center", "Other"],
	Gondar: ["Azezo", "Fasil", "Gondar Town", "Maraki", "Piazza", "Other"],
	Harar: ["Aboker", "Amir Nur", "Harar Town", "Jegol", "Other"],
	Hawassa: ["Addis Ketema", "Hayk Dar", "Mehal Ketema", "Misrak", "Tabor", "Other"],
	Hosaena: ["Hosaena Town", "City Center", "Other"],
	Jigjiga: ["Jigjiga Town", "City Center", "Other"],
	Jimma: ["Jimma Town", "Mango", "Mendera", "Seka", "Other"],
	Kombolcha: ["Kombolcha Town", "City Center", "Other"],
	Mekelle: ["Addi Haqi", "Ayder", "Hawelti", "Kedamay Weyane", "Quiha", "Other"],
	Nekemte: ["Nekemte Town", "City Center", "Other"],
	Semera: ["Semera Town", "City Center", "Other"],
	Shashamane: ["Shashamane Town", "City Center", "Other"],
	Shire: ["Shire Town", "City Center", "Other"],
	"Wolaita Sodo": ["Sodo Town", "City Center", "Other"],
} as const;

export const ETHIOPIA_CITIES = Object.keys(ETHIOPIA_CITY_SUBCITIES).sort((a, b) =>
	a.localeCompare(b),
);

export const getSubCitiesForCity = (city: string): string[] => {
	if (!city) {
		return [];
	}
	return [...(ETHIOPIA_CITY_SUBCITIES[city] ?? ["City Center", "Other"])];
};
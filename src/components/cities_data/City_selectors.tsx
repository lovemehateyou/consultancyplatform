import { ETHIOPIA_CITIES, getSubCitiesForCity } from "./Ethiopias_cities";
import { Label } from "@/components/ui/label";

const selectClassName =
	"h-12 w-full text-left text-sm text-muted-foreground border-2 border-black rounded-lg bg-transparent px-3 disabled:cursor-not-allowed disabled:opacity-50";

type EthiopiaLocationSelectsProps = {
	city: string;
	subCity: string;
	onCityChange: (city: string) => void;
	onSubCityChange: (subCity: string) => void;
	disabled?: boolean;
	cityPlaceholder?: string;
	subCityPlaceholder?: string;
};

export const EthiopiaLocationSelects = ({
	city,
	subCity,
	onCityChange,
	onSubCityChange,
	disabled = false,
	cityPlaceholder = "Select city",
	subCityPlaceholder = "Select sub-city",
}: EthiopiaLocationSelectsProps) => {
	const subCities = getSubCitiesForCity(city);

	const handleCityChange = (nextCity: string) => {
		onCityChange(nextCity);
		const options = getSubCitiesForCity(nextCity);
		if (!options.includes(subCity)) {
			onSubCityChange("");
		}
	};

	return (
		<>
            <div>
            <Label htmlFor="BusinessCity">City</Label>
			<select
				className={selectClassName}
				value={city}
				onChange={(e) => handleCityChange(e.target.value)}
				disabled={disabled}
				aria-label="Business city"
			>
				<option value="" disabled>
					{cityPlaceholder}
				</option>
				{ETHIOPIA_CITIES.map((name) => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</select>
            </div>
            <div>

            <Label htmlFor="BusinessSubCity">Sub-city</Label>
			<select
				className={selectClassName}
				value={subCity}
				onChange={(e) => onSubCityChange(e.target.value)}
				disabled={disabled || !city}
				aria-label="Business sub-city"
			>
				<option value="" disabled>
					{city ? subCityPlaceholder : "Select a city first"}
				</option>
				{subCities.map((name) => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</select>
            </div>
		</>
	);
};

import Image from "next/image";
import data from "./planetsData.json";

type Planet = {
	name: string;
	distanceFromSunKm: number;
	diameterKm: number;
	moons: number;
	type: string;
	orbitPeriodDays: number;
	image: string;
}

type DwarfPlanet = {
	name: string;
	distanceFromSunKm: number;
	diameterKm: number;
	moons: number;
	type: string;
	orbitPeriodDays: number;
	image: string;
}

type Comet = {
	name: string;
	discoveryYear: number;
	orbitPeriodYears: number;
	LastSeen: number;
	nextAppearance: number;
	image: string;
}

export default function SolarPlanets() {
	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold mb-4">Celestial Bodies</h1>
			{data.planets.map((planet: Planet, index: number) => (
				<div className="bg-gray-800 text-white p-4 m-4" key={index}>
					<div className="text-xl font-bold mb-4">{planet.name}</div>
					<Image className="mb-4 rounded" src={`/solar-system/${planet.image}`} alt={planet.name} width={400} height={400} />
					<p>Distance from Sun: {planet.distanceFromSunKm} km</p>
					<p>Diameter: {planet.diameterKm} km</p>
					<p>Moons: {planet.moons}</p>
					<p>Type: {planet.type}</p>
					<p>Orbit Period: {planet.orbitPeriodDays} days</p>
				</div>
			))
			}

			{data.dwarfPlanets.map((dwarfPlanet: DwarfPlanet, index: number) => (
				<div className="bg-gray-800 text-white p-4 m-4" key={index}>
					<div className="text-xl font-bold mb-4">{dwarfPlanet.name}</div>
					<Image className="mb-4 rounded" src={`/solar-system/${dwarfPlanet.image}`} alt={dwarfPlanet.name} width={400} height={400} />
					<p>Distance from Sun: {dwarfPlanet.distanceFromSunKm} km</p>
					<p>Diameter: {dwarfPlanet.diameterKm} km</p>
					<p>Moons: {dwarfPlanet.moons}</p>
					<p>Type: {dwarfPlanet.type}</p>
					<p>Orbit Period: {dwarfPlanet.orbitPeriodDays} days</p>
				</div>
			))
			}

			{data.comets.map((comet: Comet, index: number) => (
				<div className="bg-gray-800 text-white p-4 m-4" key={index}>
					<div className="text-xl font-bold mb-4">{comet.name}</div>
					<Image className="mb-4 rounded" src={`/solar-system/${comet.image}`} alt={comet.name} width={400} height={400} />
					<p>Discovery Year: {comet.discoveryYear}</p>
					<p>Orbit Period: {comet.orbitPeriodYears} years</p>
					<p>Last Seen: {comet.LastSeen}</p>
					<p>Next Appearance: {comet.nextAppearance}</p>
				</div>
			))
			}
		</div >
	);
}


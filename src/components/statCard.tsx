"use server";

const StatCard = ({ title, value }: { title: string; value: number }) => (
	<div className="flex flex-col items-center justify-center mb-4">
		<h3 className="text-l font-bold mb-2">{title}</h3>
		<p className="text-xl">{value}</p>
	</div>
);

export default StatCard;

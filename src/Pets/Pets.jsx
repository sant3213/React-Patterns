import { UsePets } from "./UsePets";
import pet from "./pet.module.scss";

export const Pets = () => {
    const { data: pets, loading, error } = UsePets('https://api.publicapis.org/entries');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={pet.container}>
            <ul>
                {pets && pets.entries.map(pet => (
                    <li key={pet.API}>{pet.Description}</li>
                ))}
            </ul>
        </div>
    );
}
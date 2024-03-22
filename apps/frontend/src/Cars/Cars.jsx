import { UseCars } from "./UseCars";
import css from "./css.module.scss";
import { constants } from "../utils/constants";
import TableRow from "../Table/TableRow";

export const Cars = () => {
/**
 * PETS_URL Could be in the UsePets directly,
 * but it is used here as an example on how to pass the parameter to the custom hook.
 */
    const { data: cars, loading, error } = UseCars(constants.CARS_URL); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={css.container}>
        <table className={css.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Car</th>
                    <th>Available</th>
                </tr>
            </thead>
            <tbody>
                  {cars && cars.map((car, index) => (
                        <TableRow key={car.id} car={car} index={index} />
                    ))}
            </tbody>
        </table>
    </div>
    );
}


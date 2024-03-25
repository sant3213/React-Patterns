import React, { useState } from 'react';
import { UseCars } from "./UseCars";
import css from "./css.module.scss";
import { constants } from "../utils/constants";
import TableRow from "../Table/TableRow";
import { Car } from './ICar';


export const Cars: React.FC = () => {
    const [brand, setBrand] = useState<string>('');
    const [horsePower, setHorsePower] = useState<string>(''); // Change to number if applicable
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
                    {cars && cars.map((car: Car, index: number) => (
                        <TableRow key={car.id} car={car} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

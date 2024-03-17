import { UsePets } from "./UsePets";
import css from "./css.module.scss";
import { constants } from "../utils/constants";
import TableRow from "../Table/TableRow";

export const Pets = () => {
/**
 * PETS_URL Could be in the UsePets directly,
 * but it is used here as an example on how to pass the parameter to the custom hook.
 */
    const { data: pets, loading, error } = UsePets(constants.PETS_URL); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={css.container}>
        <table className={css.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {/* {pets && pets.map((pet, index) => {
                     const [isHovered, hoverRef] = useHover();
                    return (
                        <tr key={pet.id} ref={hoverRef} className={`${isHovered ? css.hoveredRow : ''} ${index % 2 === 0 ? css.evenRow : css.oddRow}`}>
                        <td>{pet.id}</td>
                        <td>{pet.title}</td>
                        <td>{pet.completed ? 'Complete' : 'Not completed'}</td>
                    </tr>
                )})} */}
                  {pets && pets.map((pet, index) => (
                        <TableRow key={pet.id} pet={pet} index={index} />
                    ))}
            </tbody>
        </table>
    </div>
    );
}


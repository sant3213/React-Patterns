import React from 'react';

import css from "../Pets/css.module.scss";
import useHover from '../utils/UseHover';

const TableRow = ({ pet, index }) => {
    const [isHovered, hoverRef] = useHover();

    return (
        <tr 
            ref={hoverRef} 
            className={`${isHovered ? css.hoveredRow : ''} ${index % 2 === 0 ? css.evenRow : css.oddRow}`}>
            <td>{pet.id}</td>
            <td>{pet.title}</td>
            <td>{pet.completed ? 'Complete' : 'Not completed'}</td>
        </tr>
    );
};

export default TableRow;

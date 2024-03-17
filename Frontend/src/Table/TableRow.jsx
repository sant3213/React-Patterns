import React from 'react';

import css from "../Cars/css.module.scss";
import useHover from '../utils/UseHover';

const TableRow = ({ car, index }) => {
    const [isHovered, hoverRef] = useHover();

    return (
        <tr 
            ref={hoverRef} 
            className={`${isHovered ? css.hoveredRow : ''} ${index % 2 === 0 ? css.evenRow : css.oddRow}`}>
            <td>{car.id}</td>
            <td>{car.title}</td>
            <td>{car.completed ? 'Yes' : 'No'}</td>
        </tr>
    );
};

export default TableRow;

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './table.css';
import { deleteRow, changerole } from './dataSlice'; // Import the action creator
import DynamicForm from './DynamicForm';
const Table = ({ data, setCreate, create }) => {
    const [form, setForm] = useState(null)
    const INITIAL_STATE = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const handleDelete = (index) => {
        // Display an alert for confirmation
        const isConfirmed = window.confirm('Are you sure you want to delete this row?');

        if (isConfirmed) {
            // Dispatch the deleteRow action with the index to delete the row
            dispatch(deleteRow(index));
        }
    };
    const makeForm = () => {
        dispatch(changerole())
        setCreate(true)
        setForm(<DynamicForm data={data} />)
    }
    return (
        <div>
            {!form && (<table className="excel-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Field</th>
                        <th>Name</th>
                        <th>Datatype</th>
                        <th>Validation</th>
                        <th>Required</th>
                        <th>Items</th>
                        <th>Range</th>
                        <th>Action</th> {/* New column for Delete button */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{rowData.field || 'nil'}</td>
                            <td>{rowData.name || 'nil'}</td>
                            <td>{rowData.datatype || 'nil'}</td>
                            <td>{`max len ${rowData.validation}` || 'nil'}</td>
                            <td>{rowData.required || 'nil'}</td>
                            <td>{rowData.items && rowData.items.length > 0 ? rowData.items.join(', ') : 'nil'}</td>
                            <td>{rowData.range && rowData.range.length > 0 ? rowData.range.join(', ') : 'nil'}</td>
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
            {!form && <button onClick={makeForm}>make Form</button>}
            {form}
        </div>
    );
};

export default Table;

import React, { useEffect, useState } from 'react';
import Category from './Category';
import { useSelector, useDispatch } from 'react-redux';
import { addvalue } from './dataSlice';
import Table from './Table';

const DynamicField = () => {
    const dispatch = useDispatch();
    const [create, setCreate] = useState(false)
    const INITIAL_STATE = useSelector((state) => state.data);
    const user = INITIAL_STATE.iscurr;
    const field = INITIAL_STATE.field;
    const [items, setItems] = useState([]);
    const [temp, setTemp] = useState('');
    const [name, setNamae] = useState('');
    const [datatype, setDatatype] = useState('number');
    const [len, setLen] = useState(0);
    const [required, setRequired] = useState('...Select');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = () => {
        if (user === 'Student' && INITIAL_STATE.student_form.length > 4) {
            window.alert("cannot add more then 4")
            return
        }
        let data = { field, name, datatype, validation: len, required };
        if (field === 'dropdown') {
            data = {
                ...data, items: items.map((total) => {
                    return total.value
                })
            };
        } else {
            data = { ...data, items: [] };
        }
        if (field === 'date') {
            data = { ...data, range: [start, end] };
        } else {
            data = { ...data, range: [] };
        }
        dispatch(addvalue(data));
        setNamae('');
        setDatatype('number');
        setLen(0);
        setRequired('...Select');
        setItems([]);
    };

    const handleClick = () => {
        if (items.length <= 4) {
            setItems([...items, { value: temp, id: new Date().getTime() }]);
            setTemp('');
        }
    };
    const handleDelete = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    };
    useEffect(() => {
        // console.log(INITIAL_STATE.student_form);
        console.log(field);
    }, [create]);

    return (
        !create && (<div className="main-container" style={{ width: '100%' }}>
            <div className="main-field-container" style={styles.fieldContainer}>
                <div className="field-type" style={styles.field}>
                    <p>Field Type</p>
                    <Category />
                </div>
                <div className="field-name" style={styles.field}>
                    <p>Field Name</p>
                    <input type="text" onChange={(e) => setNamae(e.target.value)} value={name} style={styles.input} />
                </div>
                <div className="data-type" style={styles.field}>
                    <p>Field Data Type</p>
                    <select onChange={(e) => setDatatype(e.target.value)} value={datatype} style={styles.select}>
                        <option value="number">Number</option>
                        <option value="text">String</option>
                        {/* <option value="date">Date</option> */}
                    </select>
                </div>
                {field === 'text' && (
                    <div className="len" style={styles.field}>
                        <p>Max Length</p>
                        <input type="number" onChange={(e) => setLen(e.target.value)} value={len} style={styles.input} />
                    </div>
                )}
                {field === 'date' && (
                    <div className="date" style={{ ...styles.field, ...styles.dateContainer }}>
                        <p>Date Range</p>
                        <div className="div">
                            <label>
                                Min Range
                                <input
                                    type="date"
                                    onChange={(e) => setStart(e.target.value)}
                                    value={start}
                                    style={{ ...styles.dateInput }}
                                />
                            </label>
                        </div>
                        <div className="div">
                            <label>
                                Max Range
                                <input
                                    type="date"
                                    onChange={(e) => setEnd(e.target.value)}
                                    value={end}
                                    style={{ ...styles.dateInput }}
                                />
                            </label>
                        </div>
                    </div>
                )}
                <div className="required" style={styles.field}>
                    <p>Mandatory</p>
                    <select onChange={(e) => setRequired(e.target.value)} value={required} style={styles.select}>
                        <option value='...Select'>...Select</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                {field === 'dropdown' && (
                    <div className="field-choice" style={styles.field}>
                        <p>Field Choice</p>
                        <input type="text" value={temp} onChange={(e) => setTemp(e.target.value)} style={styles.input} />
                        <button onClick={handleClick} style={styles.button}>Add Choice</button>

                        {items.length > 0 && (
                            <div>
                                <p>Options:</p>
                                <ul>
                                    {items.map((item) => (
                                        <li key={item.id}>
                                            {item.value}
                                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                <div className="button" style={styles.field}>
                    <button onClick={handleSubmit} style={styles.button}>Confirm</button>
                </div>
            </div>
            <div style={{ width: '100%', height: 'fit-content' }}>
                {INITIAL_STATE.iscurr === 'Student' ? <Table data={INITIAL_STATE.student_form} setCreate={setCreate} create={create} /> : INITIAL_STATE.iscurr === 'Self' ? <Table data={INITIAL_STATE.self_form} setCreate={setCreate} create={create} /> : <Table data={INITIAL_STATE.business_form} setCreate={setCreate} create={create} />}
            </div>
        </div>)
    );
};

const styles = {
    fieldContainer: {
        width: '90vw',
        height: 'max-content',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        placeContent: 'center',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        gap: '10px', // Adjust the value for your desired spacing
        background: '#353d55',
        boxShadow: "3px 4px 8px rgba(255, 255, 255, 0.701)",
        borderRadius: "12px",
        padding: '0.5rem 0rem'
    },

    field: {
        // border: '2px solid red',
        display: 'grid',
        placeContent: 'center',
        width: '100%',
        boxSizing: 'border-box', // Include padding and border in the width calculation
    },
    input: {
        width: '100%',
        padding: '5px',
        boxSizing: 'border-box', // Include padding and border in the width calculation
    },
    select: {
        width: '100%',
        padding: '5px',
        boxSizing: 'border-box', // Include padding and border in the width calculation
    },
    button: {
        padding: '5px',
        cursor: 'pointer',
    },
    // Inside the styles object
    dateContainer: {
        // border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
    },
    dateInput: {
        width: '100%',
        padding: '5px',
        marginBottom: '8px', // Added margin at the bottom to separate date inputs
        boxSizing: 'border-box', // Include padding and border in the width calculation
    },
};

export default DynamicField;

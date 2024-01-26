import React from 'react';
import './customeform.css'; // Import your CSS file for form styling

const DynamicForm = ({ data, owner }) => {
    const renderFormElement = (field) => {
        switch (field.field) {
            case 'text':
                return (
                    <div key={field.name}>
                        <label>{field.name}</label>
                        <input
                            type={`${field.datatype}`}
                            name={field.name}
                            maxLength={parseInt(field.validation)}
                            required={field.required === 'Yes'}
                        />
                    </div>
                );
            case 'dropdown':
                return (
                    <div key={field.name}>
                        <label>{field.name}</label>
                        <select name={field.name} required={field.required === 'Yes'}>
                            {field.items.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 'date':
                return (
                    <div key={field.name}>
                        <label>{field.name}</label>
                        <input
                            type="date"
                            name={field.name}
                            required={field.required === 'Yes'}
                            min={field.range && field.range.length > 0 ? field.range[0] : null}
                            max={field.range && field.range.length > 1 ? field.range[1] : null}
                        />
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <form className="dynamic-form">
            <h2>{owner} Form</h2>
            {data?.map((field) => renderFormElement(field))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;

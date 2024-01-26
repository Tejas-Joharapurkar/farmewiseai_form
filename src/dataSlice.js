import { createSlice } from '@reduxjs/toolkit';

// Check if there is data in local storage
const getInitialState = () => {
    const storedData = localStorage.getItem('reduxState');
    return storedData ? JSON.parse(storedData) : {
        student_form: [],
        isSForm: false,
        isSelfForm: false,
        isBusForm: false,
        self_form: [],
        business_form: [],
        iscurr: null,
        value: null,
        field: 'text'
    };
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: getInitialState(), // Use the function to initialize the state
    reducers: {
        addvalue: (state, action) => {
            console.log('dispatched called');
            if (state.iscurr === 'Student') {
                state.student_form.push(action.payload);
            } else if (state.iscurr === 'Self') {
                state.self_form.push(action.payload);
            } else {
                state.business_form.push(action.payload);
            }
            // Save the state to local storage after modification
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        changecurr: (state, action) => {
            console.log('dispatched called 111');
            state.iscurr = action.payload;
            // Save the state to local storage after modification
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        changefiled: (state, action) => {
            state.field = action.payload;
            // Save the state to local storage after modification
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        deleteRow: (state, action) => {
            const indexToDelete = action.payload;
            if (state.iscurr === 'Student') {
                state.student_form = state.student_form.filter((_, index) => index !== indexToDelete);
            } else if (state.iscurr === 'Self') {
                state.self_form = state.self_form.filter((_, index) => index !== indexToDelete);
            } else {
                state.business_form = state.business_form.filter((_, index) => index !== indexToDelete);
            }
            // Save the state to local storage after modification
            localStorage.setItem('reduxState', JSON.stringify(state));
        },
        changerole: (state) => {
            if (state.iscurr === 'Student') {
                state.isSForm = true;
                state.isSelfForm = false;
                state.isBusForm = false;
            } else if (state.iscurr === 'Self') {
                state.isSForm = false;
                state.isSelfForm = true;
                state.isBusForm = false;
            } else {
                state.isSForm = false;
                state.isSelfForm = false;
                state.isBusForm = true;
            }
            // Save the state to local storage after modification
            localStorage.setItem('reduxState', JSON.stringify(state));
        },

    },
});

export const { addvalue, changecurr, changefiled, deleteRow, changerole } = dataSlice.actions;

export default dataSlice.reducer;

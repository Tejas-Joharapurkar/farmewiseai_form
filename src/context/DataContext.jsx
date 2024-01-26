import React, { useContext, useState, useReducer, useEffect } from "react";


const INITIAL_STATE = {
    student_form: [],
    self_form: [],
    business_form: [],
    iscurr: null,
    value: null
}

const DataContext = React.createContext(INITIAL_STATE)

const DataProvider = ({ children }) => {
    return <DataContext.Provider
        value={{
            student_form: INITIAL_STATE.student_form,
            self_form: INITIAL_STATE.self_form,
            business_form: INITIAL_STATE.business_form,
            iscurr: INITIAL_STATE.iscurr,
            value: INITIAL_STATE.value
        }}>
        {children}
    </DataContext.Provider>
}

export const useGlobalDataContext = () => {
    return useContext(DataContext)
}

export { DataProvider, DataContext }
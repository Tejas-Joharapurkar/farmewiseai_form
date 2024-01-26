import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changecurr } from './dataSlice'
import DynamicForm from './DynamicForm'
import DynamicField from './DynamicField'
const App = () => {
  const [data, setData] = useState(null)
  const INITIAL_STATE = useSelector((state) => state.data)
  console.log(INITIAL_STATE);
  const dispatch = useDispatch()
  useEffect(() => {
    if (INITIAL_STATE.iscurr === 'Student') {
      if (!INITIAL_STATE.isSForm) {
        setData(<DynamicField />)
      } else {
        setData(<DynamicForm data={INITIAL_STATE.student_form} owner={INITIAL_STATE.iscurr} />)
      }
    } else if (INITIAL_STATE.iscurr === 'Self') {
      if (!INITIAL_STATE.isSelfForm) {
        setData(<DynamicField />)
      } else {
        setData(<DynamicForm data={INITIAL_STATE.self_form} owner={INITIAL_STATE.iscurr} />)
      }
    }
    else if (INITIAL_STATE.iscurr === 'Business') {
      if (!INITIAL_STATE.isBusForm) {
        setData(<DynamicField />)
      } else {
        setData(<DynamicForm data={INITIAL_STATE.business_form} owner={INITIAL_STATE.iscurr} />)
      }
    }
  }, [INITIAL_STATE.iscurr])
  return (
    <div style={{ display: 'grid', width: '100%', placeContent: 'center', }}>
      <h1>Dynamic Data Collection</h1>
      <select onChange={(e) => { dispatch(changecurr(e.target.value)) }} style={{ width: '40%', height: '2rem', marginBottom: '2rem' }}>
        <option value="">Select...</option>
        <option value="Student">Student</option>
        <option value="Self">Self</option>
        <option value="Business">Business</option>
      </select>
      {data}
    </div >
  )
}

export default App

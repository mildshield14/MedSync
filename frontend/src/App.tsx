import React, {useRef} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import useElementSize from "./hook/useElementSize.tsx";
// import Medications from './pages/Medications'
// import Appointments from './pages/Appointments'


function App() {

    const ref = useRef<HTMLDivElement>(null);

    // Define breakpoints
    const breakpoints = {
        small: { min: 300, max: 599 },
        medium: { min: 600, max: 899 },
        large: { min: 900, max: 1399 },
        extra: { min: 1400, max: Infinity },
    };

    const size = useElementSize(ref, breakpoints);

    return (
        <Router>
            <div className={`${size} app`} ref={ref}>
                <Navbar/>
                <div className="app-container">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        {/*<Route path="/medications" element={<Medications />} />*/}
                        {/*<Route path="/appointments" element={<Appointments />} />*/}
                    </Routes>
                </div>
            </div>
        </Router>
)
}

export default App

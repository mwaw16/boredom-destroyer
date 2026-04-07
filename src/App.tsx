import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Home from './pages/Home/Home.tsx';
import Activities from './pages/Activities/Activities.tsx';
import AddActivityForm from './components/AddActivityForm/AddActivityForm.tsx';

import { ActivityProvider } from './context/Activity/ActivityProvider.tsx';

import './App.scss'
import './styles/icons.scss';
import './styles/fonts.scss';

function AppContent() {
    const location = useLocation();
    const [isAddActivityFormOpen, setAddActivityFormOpen] = useState(false);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const routesRef = useRef(null);
    const prevPathnameRef = useRef(location.pathname);

    useEffect(() => {
        // Determine direction based on route order
        const routeOrder = ['/', '/activities'];
        const prevIndex = routeOrder.indexOf(prevPathnameRef.current);
        const currIndex = routeOrder.indexOf(location.pathname);

        if (currIndex > prevIndex) {
            setDirection('forward');
        } else if (currIndex < prevIndex) {
            setDirection('backward');
        }

        prevPathnameRef.current = location.pathname;
    }, [location.pathname]);

    const handleActivityFormOpen = () => {
        setAddActivityFormOpen(true);
    }

    const handleActivityFormClose = () => {
        setAddActivityFormOpen(false);
    }

    return (
        <div className="boredom-destroyer-app">
            <h1 className="brd-title">Boredom Destroyer</h1>
            <ActivityProvider>
                <div className="brd-routes-container">
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={location.pathname}
                            classNames={direction === 'forward' ? 'slide-right' : 'slide-left'}
                            timeout={300}
                            nodeRef={routesRef}
                        >
                            <div ref={routesRef} className="brd-routes">
                                <div className="brd-route-content">
                                    <Routes location={location}>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/activities" element={<Activities/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                <AddActivityForm onClose={handleActivityFormClose} isOpen={isAddActivityFormOpen}/>
            </ActivityProvider>

            <nav className="brd-nav">
                <ul>
                    <li>
                        <NavLink to="/">
                            <i className="icon-home"></i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/activities">
                            <i className="icon-list"></i>
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleActivityFormOpen}>
                            <i className="icon-plus"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div> 
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App

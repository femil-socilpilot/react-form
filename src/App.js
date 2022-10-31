import React, { Component, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages'

// layout
import DefaultLayout from './layouts';
export class App extends Component {
    render() {
        return (
            <Suspense fallback={() => <h1>Loading...</h1>}>

                <Routes>
                    {/* PURE Component */}
                    {/* <ParentComponent /> */}

                    {/* Error Boundary */}
                    {/* <ErrorBoundary>
                    <Hero hero={'batman'} />
                </ErrorBoundary>
                <ErrorBoundary>
                <Hero hero={'joker'} />
            </ErrorBoundary> */}

                    {/* HOC */}
                    {/* <ClickCounter name='clickCounter' /> */}
                    {/* <HoverCounter /> */}
                    <Route exact path='/' element={<DefaultLayout />}>
                        <Route index path='/' element={<Home />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/signin' element={<SignIn />} />
                    </Route>

                </Routes>
            </Suspense>
        );
    }
}

export default App
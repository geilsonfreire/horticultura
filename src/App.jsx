import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MyRoutes from './routes/my-routes';



const App = () => {
    return (
        <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <div className="min-h-screen bg-gray-50">
                
                <MyRoutes />
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 5000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            duration: 3000,
                            theme: {
                                primary: 'green',
                                secondary: 'black',
                            },
                        },
                        error: {
                            duration: 3000,
                            theme: {
                                primary: 'red',
                                secondary: 'black',
                            },
                        },
                    }}
                />
            </div>
        </Router>
    );
}

export default App;
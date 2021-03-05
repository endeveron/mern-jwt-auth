import './App.css'

import { AuthProvider } from './shared/context/auth-context';
import Routes from "./routes/Routes";

const App = () => {

  return (
    <AuthProvider >
      <Routes />
    </AuthProvider>
  )
}

export default App;

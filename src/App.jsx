import { Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Launch from './routes/Launch';
import Newto from './routes/NewTo';
import ImportWallet from './routes/ImportWallet';
import SetupWallet from './routes/SetupWallet';
import WalletHome from './components/WalletHome';

function App() {
  return (
    <div className="bg-gray-600 w-screen h-screen">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/setupwallet/" element={<Newto />} />
        <Route path="/setupwallet/import" element={<ImportWallet />} />
        <Route path="/setupwallet/setup" element={<SetupWallet />} />
        <Route path="/wallet/" element={<WalletHome />} />
      </Routes>
    </div>
  );
}

export default App;

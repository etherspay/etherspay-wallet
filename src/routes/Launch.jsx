import { useEffect, useState } from 'react';

// Components
import WalletSetup from '../components/WalletSetup';
import WalletLogin from '../components/WalletLogin';

import GHIcon from '../assets/github.png';

function Launch() {
  const [walletSetup, setWalletSetup] = useState(false);
  const [walletLogin, setWalletLogin] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('walletPassword')) {
      setWalletLogin(true);
    } else {
      setWalletSetup(true);
    }
  }, []);

  return (
    <>
      {walletSetup && <WalletSetup />}
      {walletLogin && <WalletLogin />}
      <div className="absolute bottom-1 right-1">
        <a
          href="https://github.com/etherspay/etherspay-wallet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-xs font-semibold text-white py-1 px-3 bg-gray-600 border border-gray-500 rounded-full"
        >
          <p>Github</p>
          <img className="w-5 h-5" src={GHIcon} alt="Github" />
        </a>
      </div>
    </>
  );
}

export default Launch;

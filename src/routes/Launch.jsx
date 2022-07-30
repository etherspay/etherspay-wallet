import { useEffect, useState } from 'react';

// Components
import WalletSetup from '../components/WalletSetup';

import GHIcon from '../assets/github.png';

function Launch() {
  const [walletSetup, setWalletSetup] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('walletSetup') !== 'true') {
      setWalletSetup(true);
    }
  }, []);

  return (
    <>
      {walletSetup && <WalletSetup />}
      <div className="absolute bottom-1 right-1">
        <a
          href="https://github.com/etherspay/wallet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-xs font-semibold text-white py-1 px-3 bg-gray-700 rounded-full"
        >
          <p>Github Repo</p>
          <img className="w-5 h-5" src={GHIcon} alt="Github" />
        </a>
      </div>
    </>
  );
}

export default Launch;

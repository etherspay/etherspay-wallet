import MenuBar from './components/MenuBar';
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');

function App() {
  return (
    <div className="bg-gray-600 w-screen h-screen">
      <MenuBar />
    </div>
  );
}

export default App;

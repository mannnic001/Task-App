import './App.css';
import Home from './Home'

function App() {
  return (
    <div className="App">
      {/*Add Task Manager to the top of the page and then call home.js for the rest of the page */}
      <h1>Task Manager</h1>
      <Home />
    </div>
  );
}

export default App;

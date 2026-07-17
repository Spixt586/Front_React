import Header from './components/Header';
import ListaNoticias from './components/ListaNoticias';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ListaNoticias />
      </main>
    </div>
  );
}

export default App;
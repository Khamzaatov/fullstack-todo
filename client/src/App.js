import './style.sass'
import Header from './components/Header/Header';
import Todo from './components/Todo/Todo';
import Filter from './components/Filter/Filter';

function App() {
  return (
    <div className="App">
      <Header />
        <div className='section'>
          <Filter />
          <Todo />
        </div>
    </div>
  );
}

export default App;

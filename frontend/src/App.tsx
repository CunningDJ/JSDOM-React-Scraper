import * as React from 'react';

import UrlScraperPage from './pages/UrlScraperPage';

import './style/global.css';
import './App.css';


interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <div className="App">
        <div className="App_background" />
        <header className="App-header">
          <h1 className="App-title">JSDOM-React Page Scraper App</h1>
        </header>
        <UrlScraperPage />
      </div>
    );
  }
}

export default App;
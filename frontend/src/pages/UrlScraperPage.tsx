import * as React from 'react';

import './UrlScraperPage.css';

import UrlScraperPanel from '../parts/UrlScraperPanel/UrlScraperPanel';


interface IUrlScraperPageProps {}
interface IUrlScraperPageState {}

export default class UrlScraperPage extends React.Component<IUrlScraperPageProps, IUrlScraperPageState> {
  public render() {
    return (
      <div className="url-scraper-page">
        <UrlScraperPanel />
      </div>
    );
  }
}
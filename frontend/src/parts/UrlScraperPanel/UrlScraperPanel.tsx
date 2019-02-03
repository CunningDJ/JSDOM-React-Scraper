import * as React from 'react';
import { FormEvent, MouseEvent } from 'react';
import isUrl from 'is-url';

import { getScrapedUrlData } from '../ApiCaller/ApiCaller';
import { IGetScrapedUrlData } from '../ApiCaller/ApiCaller.d';

import './UrlScraperPanel.css';

interface IUrlScraperPanelProps {}
interface IUrlScraperPanelState {
  urlInput: string;
  scrapeData: IGetScrapedUrlData | null,

  dataFetching: boolean;

  formError: string;
  urlInputError: string;
}

export default class UrlScraperPanel extends React.Component<IUrlScraperPanelProps, IUrlScraperPanelState> {
  constructor(props: IUrlScraperPanelProps) {
    super(props);

    this.state = {
      urlInput: "",
      scrapeData: null,

      dataFetching: false,

      formError: "",
      urlInputError: ""
    }

    this.changedUrlInput = this.changedUrlInput.bind(this);
    this.submitUrlInput = this.submitUrlInput.bind(this);
  }

  public changedUrlInput(e: FormEvent<HTMLInputElement>) {
    const newUrl: string = e.currentTarget.value;

    this.setState({
      urlInput: newUrl
    })
  }

  public submitUrlInput(e: MouseEvent<HTMLButtonElement>) {
    /**
     * Logic for fetching scraped url data
     */
    e.preventDefault();

    // resetting error messages before execution
    this.setState({
      formError: "",
      urlInputError: ""
    });

    const { urlInput } = this.state;

    // Checking validly formatted URL
    if (!isUrl(urlInput)) {
      this.setState({
        urlInputError: "Invalid format for URL"
      })
      return;
    }

    this.setState({
      dataFetching: true
    })

    // Fetching scraped URL data via scraper server API
    getScrapedUrlData(urlInput)
      .then(({ data: resJson }) => {
        const { data, err } = resJson;
        if (err !== "") {
          // Error reported by server
          this.setState({
            formError: err,
            scrapeData: null,
            dataFetching: false
          });
        } else {
          // Data successfully retrieved
          this.setState({
            scrapeData: data,
            dataFetching: false
          })
        }
      })
      .catch((err) => {
        // Error with AJAX operation
        const errMessage = err.message; // alt: err.name + ': ' + err.message;
        this.setState({
          formError: errMessage,
          scrapeData: null,
          dataFetching: false
        })
      });
  }

  public render() {
    const sdata = this.state.scrapeData;
    const scrapeDataVisStyle = sdata && !this.state.dataFetching ? 
                                  {} : {display: 'none'};

    return (
      <div className="url-scraper-panel">
        <form className="url-scraper-panel__form item-box">
          <div>
            <h1>URL Scraper</h1>
          </div>
          <p className="url-scraper-panel__form-error">{this.state.formError}</p>
          <div>
            {/*<h3 className="url-scraper-panel__url-input-label">URL</h3>*/}
            <p className="url-scraper-panel__url-input-error">{this.state.urlInputError}</p>
            <input 
              className="url-scraper-panel__url-input" 
              type="text" 
              onChange={this.changedUrlInput} 
              value={this.state.urlInput}
              disabled={this.state.dataFetching}
              placeholder="http://example.com"
            />
          </div>
          <div>
            <button onClick={this.submitUrlInput} className="url-scraper-panel__submit-button">
              Scrape
            </button>
          </div>
        </form>
        {}
        <div className="url-scraper-panel__vis item-box" style={scrapeDataVisStyle}>
          <h2>Data Visualization</h2>
        </div>
      </div>
    );
  }
}
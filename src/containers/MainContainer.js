import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  
  state = {
    stocks: [],
    portfolio: [],
    sorti: "None",
    filteri: "All",
    searchi: ""
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
      .then(r => r.json())
      .then(stockData => this.setState({stocks: stockData}))
  }

  addToPortfolio = (stock) => {
    if (!this.state.portfolio.includes(stock)){
      this.setState({portfolio: [...this.state.portfolio, stock]})
    }
  }

  removeFromPortfolio = (stock) => {
    let newPortfolio = this.state.portfolio.filter(stocks => stocks.id !== stock.id)
    this.setState({
      portfolio: newPortfolio
    })
  }

  updateSort = (sort) => {
    this.setState({
      sorti: sort})
  }

  updateFilter = (filter) => {
    this.setState({
      filteri: filter})
  }

  updateSearch = (search) => {
    this.setState({
      searchi: search})
  }  

  displayStocks = () => {
    let displayStocks = this.state.stocks.filter(stock=>
      stock.name.toLowerCase().includes(this.state.searchi)
   )

    if (this.state.filteri !== "All"){
      displayStocks = displayStocks.filter(stock => stock.type === this.state.filteri)
    }

    switch(this.state.sorti){
      case "Alphabetically": 
        return displayStocks.sort((a,b)=> a.name > b.name ? 1: -1)
      case "Price": 
        return displayStocks.sort((a,b)=> a.price > b.price ? 1: -1)
      case "None": 
        return displayStocks
    }
    return displayStocks
  }

  render() {
    return (
      <div>
        <SearchBar 
          updateSort={this.updateSort} 
          sorti={this.state.sorti} 
          updateFilter={this.updateFilter} 
          updateSearch={this.updateSearch}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.displayStocks()} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} removeFromPortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

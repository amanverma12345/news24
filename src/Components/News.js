import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
    
  }
  static propTypes = {
    country: PropTypes.string, 
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  
  constructor(){    //it will run befor render() method.
    super();            //compulsory to use in constructor()...it will be called when a object is created.
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){       // a lifecycle method..it will run after render() method.
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4b87b9418d145959ef099aedd86bf78&pageSize=${this.props.pageSize}`;  //used to fetch the news
     this.setState({loading: true});
     let data = await fetch(url);  // fetch api tekes url and return a promise...async function wait kr skta h apni body k andar kuch promises resolve hone ka.
     let parsedData = await data.json()
     this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
  }

  handlePreviousClick = async  ()=>{

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4b87b9418d145959ef099aedd86bf78&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }

  handleNextClick = async ()=>{
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4b87b9418d145959ef099aedd86bf78&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
    }

  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin: '25px 0px'}}>Top Headlines - News24</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>{

           return <div className="col-md-4" key={element.url} >
           <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} 
            imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
            source={element.source.name}
            className="card-img-top" alt="..."/>
           </div>   

        })}           
               
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-warning" onClick= {this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-warning" onClick= {this.handleNextClick}>Next &rarr;</button>
        </div>                                 
      </div>
    )
  }
}

export default News

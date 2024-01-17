import React, { Component } from 'react'

export class NewsItems extends Component {

  
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
      <div className="card">
         <img src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPw0yhnc697KVot68XFQossK-m5_xgytIkQ&usqp=CAU": imageUrl} className="card-img-top" alt="..."/>
         <div className="card-body">
        <h5 className="card-title">{title} <span className="position-absolute top-0 start-50 translate-middle badge round-pill bg-info"> {source} </span></h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
        <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-warning">Read more</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItems

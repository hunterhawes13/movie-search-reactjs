var MovieDetails = React.createClass({
  handleFavorite: function() {
    $.ajax({
      type: "POST",
      url: "/favorites",
      data: this.props.detailData,
      dataType: "json",
      success: function(data) {
        $(".favorite#"+this.props.detailData.imdbID).addClass("active");
      }.bind(this),
      error: function(e) {
        console.log("error", e.responseText);
      }
    });
  },
  render: function() {
    return (
      <div className='movieDetail collapse' id={this.props.detailData.imdbID}>
        <div className='row'>
          <div className='col-sm-4'>
            <img src={this.props.detailData.Poster} />
          </div>
          <div className='col-sm-8'>
            <div className='row'>
              <a href="#" className="btn btn-warning favorite" id={this.props.detailData.imdbID} onClick={this.handleFavorite} >
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Favorite
              </a>
            </div>
            <div className='row'>
              <h4>
                IMDB Rating: <small>{this.props.detailData.imdbRating} from {this.props.detailData.imdbVotes} votes</small>
              </h4>
            </div>
            <p className='row'>{this.props.detailData.Plot}</p>
          </div>
        </div>

      </div>
    );
  }
});

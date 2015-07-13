var Movie = React.createClass({
  fetchMovieDetails: function(id) {
    // Fetch movie details
    var callback = 'c'+Math.floor((Math.random()*100000000)+1);
    $.ajax({
      type: 'GET',
      url: '//www.omdbapi.com/?i='+id+'&y=&plot=short&r=json?',
      async: false,
      jsonpCallback: callback,
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(data) {
        // When data is ready update state to rerender MovieDetails template
        this.setState({detailData: data});
      }.bind(this),
      error: function(e) {
         console.log('error', e);
      }
    });
  },
  getInitialState: function () {
    return {detailData: []};
  },
  componentDidMount: function() {
    this.fetchMovieDetails(this.props.id);
  },
  render: function() {
    return (
      <li className='movie list-group-item'>
        <a href={'#'+this.props.id} className='movieTitle' data-toggle='collapse'>
          <h4>{this.props.title}</h4>
        </a>
        <MovieDetails detailData={this.state.detailData} />
      </li>
    );
  }
});

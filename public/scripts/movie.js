var Movie = React.createClass({
  fetchMovieDetails: function(id) {

    // ajax will complain if the same callback function is used
    // so we define a new one based on random number
    var callback = 'c'+Math.floor((Math.random()*100000000)+1);

    // Fetch movie details
    $.ajax({
      type: 'GET',
      url: '//www.omdbapi.com/?i='+id+'&y=&plot=short&r=json?',
      async: false,
      jsonpCallback: callback,
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(data) {
        // Notify that state has changed now that we have data
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
    // Watch for state change from fetchMovieDetails
    // When data is ready update state to re-render MovieDetails template
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

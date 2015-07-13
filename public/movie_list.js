var MovieList = React.createClass({
  // Renders an array of movies and return a list of them
  render: function() {
    if(!this.props.data.error) {
      var movieNodes = this.props.data.map(function (movie, index) {
        return (
          <Movie title={movie.Title} id={movie.imdbID} key={index} />
        );
      });
      return (
        <ul className='movieList list-group'>
          {movieNodes}
        </ul>
      );
    }
    return (
      <h2>No Results Found!</h2>
    );
  }
});

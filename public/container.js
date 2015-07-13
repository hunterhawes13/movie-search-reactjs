var Container = React.createClass({
  handleSearchSubmit: function(search){
    // Need to get title in the form of 'Star+Wars' for 'Star Wars' for OMBD API
    var title = search.title.split(' ').join('+');

    // Do a search request to OMBD for movies matching the title
    $.ajax({
      type: 'GET',
      url: '//www.omdbapi.com/?s='+title+'&r=json',
      async: false,
      jsonpCallback: 'jsonCallback',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(data) {
        if(data.Search) {
          $("#searchPlaceholder").hide();
          // OMDB API returns {Search: [{...}]} on successful search
          this.setState({searchData: data.Search});
          return;
        }
        // OMDB API returns {Response: 'False', Error: 'Movie not found!'}
        // when search is unsuccessful. Poor API conventions.
        this.setState({data: {error: data.Error}});
      }.bind(this),
      error: function(e) {
         console.log('error', e.responseText);
      }
    });
  },
  fetchFavorites: function() {
    $.ajax({
      type: 'GET',
      url: '/favorites',
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        $("#favoritesPlaceholder").hide();
        this.setState({favoritesData: data});
      }.bind(this),
      error: function(e) {
        console.log('error', e);
      }
    });
  },
  getInitialState: function() {
    return {
      searchData: [],
      favoritesData: []
    };
  },
  componentDidMount: function() {
    this.fetchFavorites();
  },
  render: function() {
    return (
      <div className='container'>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Movie Search</a>
            </div>
            <SearchForm onSearchSubmit={this.handleSearchSubmit} />
          </div>
        </nav>
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active"><a href="#search" aria-controls="home" role="tab" data-toggle="tab">Search</a></li>
          <li role="presentation"><a href="#favorites" aria-controls="profile" role="tab" data-toggle="tab" onClick={this.fetchFavorites}>Favorites</a></li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="search">
            <MovieList data={this.state.searchData} />
            <h3 id="searchPlaceholder">Search For Some Movies!</h3>
          </div>
          <div role="tabpanel" className="tab-pane" id="favorites">
            <MovieList data={this.state.favoritesData} />
            <h3 id="favoritesPlaceholder">Favorite Some Movies!</h3>
          </div>
        </div>
      </div>
    );
  }
});

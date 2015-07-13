var SearchForm = React.createClass({
  handleSubmit: function(e) {
    // When user clicks search get the movie title and feed it
    // to the onSearchSubmit function in Container class to
    // fetch OMDB data
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    if(!title) {
      return;
    }
    this.props.onSearchSubmit({title: title});
    React.findDOMNode(this.refs.title).value = ''; // Clear form value
    return;
  },
  render: function() {
    return (
      <form className="searchForm navbar-form navbar-right" role="search">
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Search for a movie' ref='title' />
        </div>
        <a role='button' className='btn btn-primary' onClick={this.handleSubmit}>Search</a>
      </form>
    );
  }
});

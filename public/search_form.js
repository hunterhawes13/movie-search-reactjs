var SearchForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    if(!title) {
      return;
    }
    this.props.onSearchSubmit({title: title});
    React.findDOMNode(this.refs.title).value = '';
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

const Card = props => {
  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">{props.data.title}</h5>
        <p className="card-text">{props.data.body}</p>
        <p className="card-text">
          <small className="text-muted">{`${props.data.time} ${props.data.date}`}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">
            <cite title="Source Title">{props.data.user.name}</cite>
          </small>
        </p>
      </div>
    </div>
  );
};

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postSet: []
    };
  }

  componentDidMount() {
    try {
      fetch("http://localhost:3000/api/post/all", {
        method: "get",
        headers: {}
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            isLoading: false,
            postSet: data
          });
        });
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  }

  getPostsGrid() {
    return (
      <div className="card-columns">
        {this.state.postSet.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    );
  }
  loader() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner spinner-border"></div>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return this.loader();
    return this.getPostsGrid();
  }
}

ReactDOM.render(<View />, document.getElementById("post-grid"));

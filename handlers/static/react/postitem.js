class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      isLoading: true,
      post: null,
      claps: 0
    };

    this.handleNewClap = this.handleNewClap.bind(this);
  }

  componentDidMount() {
    const params = window.location.pathname.split("/");
    const id = params[2];
    this.setState({ id: id });
    this.loadPost(id);
  }

  loadPost(id) {
    try {
      fetch(`http://localhost:3000/api/post/${id}`, {
        method: "get",
        headers: {}
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            id: id,
            isLoading: false,
            post: data,
            claps: data.clap ? data.clap : 0
          });
        });
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  }

  handleNewClap(event) {
    event.preventDefault();
    let token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated");
      return;
    }
    this.addClapToDB(token);
  }

  addClapToDB(token) {
    try {
      fetch(`http://localhost:3000/api/post/${this.state.id}/clap`, {
        method: "post",
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            claps: this.state.claps + 1
          });
        });
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  }

  getView() {
    if (this.state.isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner spinner-border"></div>
        </div>
      );
    }

    return (
      <div>
        <div
          className="position-fixed"
          style={{ zIndex: "100", top: "50%", left: "50px" }}
        >
          <i
            onClick={this.handleNewClap}
            class="fa fa-sign-language"
            style={{
              fontSize: "25px",
              backgroundColor: "rgb(240,240,240)",
              padding: "10px",
              borderRadius: "50%",
              windth: "40px",
              height: "40px",
              cursor: "pointer"
            }}
          ></i>
          <p className="lead text-center">{this.state.claps}</p>
        </div>
        <h4>{this.state.post.title}</h4>
        <small>
          {` ${this.state.post.date} : ${this.state.post.time} - ${this.state.post.user.name}`}
        </small>
        <p className="lead" style={{ letterSpacing: "1px" }}>
          {this.state.post.body}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="col-md-6 ">{this.getView()}</div>
      </div>
    );
  }
}

ReactDOM.render(<View />, document.getElementById("post-item-block"));

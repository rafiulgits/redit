class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      token: null
    };
  }

  componentDidMount() {
    let isLogged = localStorage.getItem("isLogged");
    if (isLogged) {
      let token = localStorage.getItem("token");
      this.setState({
        isLogged: true,
        token: token
      });
    }
  }

  getNavOptions() {
    if (this.state.isLogged) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/profile">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <span
              style={{ cursor: "pointer" }}
              className="nav-link"
              onClick={event => {
                event.preventDefault();
                localStorage.clear();
                window.location.replace("/");
              }}
            >
              Logout
            </span>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/signup">
            Signup
          </a>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md bg-danger navbar-dark">
        <a className="navbar-brand" href="/">
          Redit
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          {this.getNavOptions()}
        </div>
      </nav>
    );
  }
}

ReactDOM.render(<NavBar />, document.getElementById("page-navbar"));

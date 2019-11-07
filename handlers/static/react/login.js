class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputEmail: null,
      inputPassword: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      email: this.state.inputEmail,
      password: this.state.inputPassword
    }
    try {
      fetch('http://localhost:3000/api/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) {
          alert("login failed");
          return;
        }
        else {
          res = res.json().then(data => {
            console.log(data);
          })
        }
      })
    }
    catch (err) {
      alert('something went wrong');
    }

  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 list-group-item">
            <form method="POST" onSubmit={this.handleSubmit}>
              <input type="email" className="form-control mt-3" placeholder="Email"
                onChange={event => this.setState({ inputEmail: event.target.value })} />

              <input type="password" className="form-control mt-3" placeholder="Password"
                onChange={event => this.setState({ inputPassword: event.target.value })} />

              <button className="btn btn-primary mt-4" type="submit" onSubmit={this.handleSubmit}>Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<View />, document.getElementById('login-form'))
import React from 'react';

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {

      }
    }

    render() {
    return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Alquiler de lavadoras</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/order">Ordenes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Clientes</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0 text-success">
                <label><b>CEIBA</b></label>
              </form>
            </div>
          </nav>
    )
  }
}

export default Header;

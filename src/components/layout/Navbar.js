import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import store from "../../store";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
class Navbar extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = { loggedIn: false };
  }

   componentDidMount() {
      if(this.props.location.pathname != '/login' && this.props.location.pathname != '/register'){
        if (!this.props.auth.isAuthenticated) {
          this.props.history.push("/login");
           this.setState({loggedIn:false});   
        } else {
           this.setState({loggedIn:true});   
        }
        
      }
     
    }
    componentWillReceiveProps(nextProps) {
      if(this.props.location.pathname != '/login' && this.props.location.pathname != '/register'){
        if (!nextProps.auth.isAuthenticated) {
          this.props.history.push("/login"); // push user to dashboard when they login

          this.setState({loggedIn:false}); 
        } else {

          this.setState({loggedIn:true}); 
        }
      }
       if (nextProps.auth.isAuthenticated) {
           this.setState({loggedIn:true}); 
       }
    }
  logout(){
     store.dispatch(logoutUser());
     this.setState({loggedIn:false});
      this.props.history.push("/login");
  }
    render()
    {

        return (
    
<nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
  <button type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
      </button>
  <div id="navbarContent" className="collapse navbar-collapse">
    <ul className="navbar-nav mx-auto">

      <li className="nav-item"><a href="" className="nav-link font-weight-bold text-uppercase">Home</a></li>
      {this.state.loggedIn && (
           <li className="nav-item"><a onClick={() => this.logout()} className="nav-link font-weight-bold text-uppercase">Logout</a></li>
      )}

       {!this.state.loggedIn && (
           <li className="nav-item"><Link to="/login" id="logo__link"  className="nav-link font-weight-bold text-uppercase">
                 Login
                </Link></li>
      )}
    </ul>
  </div>
</nav>
        );
      
    }
}

Navbar.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(connect(
  mapStateToProps,
  { setCurrentUser }
)(Navbar));
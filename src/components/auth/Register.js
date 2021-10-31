import React ,{Component} from 'react';
import { Link ,withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component{
    constructor()
    {
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            password2:"",
            errors:{}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
      
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChange = e =>{
        this.setState({[e.target.id]:e.target.value});
    };

    onSubmit = e =>{
        e.preventDefault();
        const newUser={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        };
        this.props.registerUser(newUser, this.props.history); 
    };
   
    render(){
        const {errors}=this.state;
        return(
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5">
                    <div class="row"> <img src="https://i.imgur.com/CXQmsmF.png" class="logo" /> </div>
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" class="image" /> </div>
                </div>
            </div>
            <div class="col-lg-6">
            <form noValidate onSubmit={this.onSubmit}>
                <div class="card2 card border-0 px-4 py-5">
                    <h4>
                            <b>Register</b> below
                        </h4>
                    <div class="row px-3 mb-4">
                          
                        <div class="line"></div> <small class="or text-center">Or</small>
                        <div class="line"></div>
                    </div>
                     <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Name</h6>
                        </label> <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            className={classnames("", {invalid: errors.name})}
                            /></div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email Address</h6>
                        </label> <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                   placeholder="Enter a valid email address"
                /></div>
               
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Password</h6>
                        </label><input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", {invalid: errors.email})}
                            /></div>
                <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Confirm Password</h6>
                        </label><input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                              })}
                            /></div>
                     
                    <div class="row mb-3 px-3"> <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                            Sign up
                            </button></div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold">Already have an account?<Link to="/login">Login</Link></small> </div>
                </div>
                </form>
            </div>
        </div>
        <div class="bg-blue py-4">
            <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
                <div class="social-contact ml-4 ml-sm-auto"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
            </div>
        </div>
    </div>
</div>
               
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
export default connect(mapStateToProps,{ registerUser })(withRouter(Register));
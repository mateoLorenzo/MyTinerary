import {NavLink} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import {useState} from 'react'
import { connect } from 'react-redux'
import authActions from '../redux/action/authActions'

const CitiesHeader = (props)=>{
   const [dropdown, setDropdown] = useState(false) 
   const abrirCerrarDropdown = ()=>{
      setDropdown(!dropdown)
   }

   const userImage = props.userLogged ? props.userLogged.image : '/img/black-user-icon.png'
   // const userImage = ''
   return (
      <>
         <header className="cities-header">
            <div className="homeAndCities-container">
               <NavLink to="/" style={{color: 'white'}}>Home</NavLink>
               <div style={{color: 'white'}}>|</div>
               <NavLink to="/cities" style={{color: 'white'}}>Cities</NavLink>
            </div>

            <div className="logo-container">
               <img src="/img/logo-finish.png" alt="MyTinerary Logo" style={{width: '150px'}}></img>
               <h1 className="logo-text" style={{color: 'black'}} >MyTinerary</h1>
            </div>

            <div className="login-section">
               {!props.userLogged &&
                  <>
                     <NavLink to="/user/signup"  className="link" style={{color: 'black'}}>Sign Up</NavLink>
                     <p style={{color: 'black', marginBottom: '0px'}}>|</p>
                     <NavLink to="/user/signin" className="link" style={{color: 'black'}}>Sign In</NavLink>
                  </>
               }
               {props.userLogged && <NavLink to="/"><p className="signOut-button" onClick={props.logOutUser} >Sign Out</p></NavLink>}   
               {props.userLogged && <p className="userName">|</p>}
               {props.userLogged && <p className="userName"> {props.userLogged.name}</p>}

               <div style={{ marginLeft: '20px', width:'100px', height: '100px', borderRadius: '50%', backgroundImage: `url(${userImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>

               </div>
            </div>
         </header> 


         <header className="cities-header-responsive">
            <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
            <DropdownToggle>
                  <img src="/icons/hamburger.png" alt="hamburguer" width="20px" />
               </DropdownToggle>

               <DropdownMenu>
               <DropdownItem>
                     <NavLink to="/" >Home</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                     <NavLink to="/cities" >Cities</NavLink>
                  </DropdownItem>
                  <DropdownItem>Sign Up</DropdownItem>
                  <DropdownItem disabled>Log In</DropdownItem>
               </DropdownMenu>
            </Dropdown>

            <div className="logo-container">
               <img src="/img/logo-finish.png" alt="mi loguito :)" style={{width: '150px'}}></img>
               <h1 className="logo-text" style={{color: 'black'}} >MyTinerary</h1>
            </div>

            <div style={{ marginLeft: '20px'}}>
                  <img src="/img/black-user-icon.png" style={{width: '60px', color: 'black'}} className="unlogged-icon" alt="user unloged logo"></img>
            </div>
         </header>
      </>
   )
}

const mapStateToProps = (state)=>{
   return {
      userLogged: state.auth.userLogged
   }
}

const mapDispatchToProps = {
   logOutUser: authActions.logOutUser
} 

export default connect(mapStateToProps, mapDispatchToProps)(CitiesHeader)
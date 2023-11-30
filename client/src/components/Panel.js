import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import admin from '../services/admin';
import userPic from '../images/users/avatar-1.jpg';
import SideBar from './common/SideBar';
import authService from '../services/auth';
import ProfileDropdown from './common/ProfileDropdown';
import MobileMenuBtn from './common/MobileMenuBtn';
import { useHistory } from "react-router-dom";


const Panel = (props) => {

    const [allow, setAllow] = useState(false);
    const history = useHistory();
    useEffect(() => {

        async function checkAuth() {
            const isAuth = await authService.isAuthenticated();
            setAllow(isAuth);
            // console.log(isAuth);
            if (!isAuth.authenticated) {
                history.push('/login')
            }
        }
        checkAuth();
    }, [])




    const handleLogout = async () => {
        const response = await authService.logout();
        // console.log(response);
        if (response === 200) {
            props.history.push('/login');
        }

    }

    document.body.dataset.layoutConfig = '{"leftSideBarTheme":"dark","layoutBoxed":false, "leftSidebarCondensed":false, "leftSidebarScrollable":false,"darkMode":false, "showRightSidebarOnStart": true}';
    document.body.dataset.leftbarTheme = 'dark';

    return (

        <React.Fragment>
            {allow ? <>

                <div className="wrapper">
                    <SideBar links={[
                        {
                            group: 'Navigation',
                            links: [
                                {
                                    title: 'Dashboard',
                                    path: '/dashboard',
                                    icon: 'home-alt'
                                },
                                {
                                    title: 'Study Moduler',
                                    path: '/study-moduler',
                                    icon: 'sliders-v'
                                },
                                {
                                    title: 'Campaign',
                                    path: '/campaign',
                                    icon: 'user'
                                }
                            ]

                        }
                    ]} />
                    <div className="content-page pb-0">
                        <div className="content">

                            <div className="navbar-custom">
                                <ul className="list-unstyled topbar-right-menu float-right mb-0">
                                    {/* <li className="dropdown notification-list d-lg-none">
                                <a className="nav-link dropdown-toggle arrow-none" role="button">
                                    <i className="dripicons-search noti-icon"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                    <form className="p-3">
                                        <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username"/>
                                    </form>
                                </div>
                            </li> */}

                                    {/* <li className="dropdown notification-list">
                                <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button">
                                    <i className="dripicons-bell noti-icon"></i>
                                    <span className="noti-icon-badge"></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg">

                                    
                                    <div className="dropdown-item noti-title">
                                        <h5 className="m-0">
                                            <span className="float-right">
                                                <a className="text-dark">
                                                    <small>Clear All</small>
                                                </a>
                                            </span>Notification
                                        </h5>
                                    </div>

                                    <div style={{maxHeight:'230 px'}} data-simplebar>
                                        
                                        <a  className="dropdown-item notify-item">
                                            <div className="notify-icon bg-primary">
                                                <i className="mdi mdi-comment-account-outline"></i>
                                            </div>
                                            <p className="notify-details">Caleb Flakelar commented on Admin
                                                <small className="text-muted">1 min ago</small>
                                            </p>
                                        </a>

                                        
                                        <a  className="dropdown-item notify-item">
                                            <div className="notify-icon bg-info">
                                                <i className="mdi mdi-account-plus"></i>
                                            </div>
                                            <p className="notify-details">New user registered.
                                                <small className="text-muted">5 hours ago</small>
                                            </p>
                                        </a>

                                        
                                        <a  className="dropdown-item notify-item">
                                            <div className="notify-icon">
                                                <img src="assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                                            <p className="notify-details">Cristina Pride</p>
                                            <p className="text-muted mb-0 user-msg">
                                                <small>Hi, How are you? What about our next meeting</small>
                                            </p>
                                        </a>

                                        
                                        <a  className="dropdown-item notify-item">
                                            <div className="notify-icon bg-primary">
                                                <i className="mdi mdi-comment-account-outline"></i>
                                            </div>
                                            <p className="notify-details">Caleb Flakelar commented on Admin
                                                <small className="text-muted">4 days ago</small>
                                            </p>
                                        </a>

                                        
                                        <a  className="dropdown-item notify-item">
                                            <div className="notify-icon">
                                                <img src="assets/images/users/avatar-4.jpg" className="img-fluid rounded-circle" alt="" /> </div>
                                            <p className="notify-details">Karen Robinson</p>
                                            <p className="text-muted mb-0 user-msg">
                                                <small>Wow ! this admin looks good and awesome design</small>
                                            </p>
                                        </a>

                                        
                                        <a  className="dropdown-item notify-item">
                                            <div className="notify-icon bg-info">
                                                <i className="mdi mdi-heart"></i>
                                            </div>
                                            <p className="notify-details">Carlos Crouch liked
                                                <b>Admin</b>
                                                <small className="text-muted">13 days ago</small>
                                            </p>
                                        </a>
                                    </div>

                                    
                                    <a  className="dropdown-item text-center text-primary notify-item notify-all">
                                        View All
                                    </a>

                                </div>
                            </li>

                            <li className="dropdown notification-list d-none d-sm-inline-block">
                                <a className="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i className="dripicons-view-apps noti-icon"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg p-0">

                                    <div className="p-2">
                                        <div className="row no-gutters">
                                            <div className="col">
                                                <a className="dropdown-icon-item" href="#">
                                                    <img src="assets/images/brands/slack.png" alt="slack"/>
                                                    <span>Slack</span>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <a className="dropdown-icon-item" href="#">
                                                    <img src="assets/images/brands/github.png" alt="Github"/>
                                                    <span>GitHub</span>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <a className="dropdown-icon-item" href="#">
                                                    <img src="assets/images/brands/dribbble.png" alt="dribbble"/>
                                                    <span>Dribbble</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col">
                                                <a className="dropdown-icon-item" href="#">
                                                    <img src="assets/images/brands/bitbucket.png" alt="bitbucket"/>
                                                    <span>Bitbucket</span>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <a className="dropdown-icon-item" href="#">
                                                    <img src="assets/images/brands/dropbox.png" alt="dropbox"/>
                                                    <span>Dropbox</span>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <a className="dropdown-icon-item" href="#">
                                                    <img src="assets/images/brands/g-suite.png" alt="G Suite"/>
                                                    <span>G Suite</span>
                                                </a>
                                            </div>
            
                                        </div>
                                    </div>

                                </div>
                            </li>

                            <li className="notification-list">
                                <a className="nav-link right-bar-toggle">
                                    <i className="dripicons-gear noti-icon"></i>
                                </a>
                            </li> */}

                                    <ProfileDropdown firstname={allow.user.firstname} userPic={userPic} logout_linkIcon='logout' logout_linkTitle="Logout" onLogout={handleLogout} links={
                                        [
                                            {
                                                linkTitle: 'My Account',
                                                linkIcon: 'account-circle',
                                                toLink: '/my-account'
                                            },
                                            {
                                                linkTitle: 'Settings',
                                                linkIcon: 'account-edit',
                                                toLink: '/settings'
                                            },
                                            {
                                                linkTitle: 'Lock Screen',
                                                linkIcon: 'lock-outline',
                                                toLink: '/lock-screen'
                                            }
                                        ]
                                    } />

                                </ul>
                                <MobileMenuBtn />
                                {/* <div className="app-search dropdown d-none d-lg-block">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control dropdown-toggle" placeholder="Search..." id="top-search"/>
                                    <span className="mdi mdi-magnify search-icon"></span>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit">Search</button>
                                    </div>
                                </div>
             
                            </form>

                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                                
                                <div className="dropdown-header noti-title">
                                    <h5 className="text-overflow mb-2">Found <span className="text-danger">17</span> results</h5>
                                </div>

                                
                                <a  className="dropdown-item notify-item">
                                    <i className="uil-notes font-16 mr-1"></i>
                                    <span>Analytics Report</span>
                                </a>

                                
                                <a  className="dropdown-item notify-item">
                                    <i className="uil-life-ring font-16 mr-1"></i>
                                    <span>How can I help you?</span>
                                </a>

                                
                                <a  className="dropdown-item notify-item">
                                    <i className="uil-cog font-16 mr-1"></i>
                                    <span>User profile settings</span>
                                </a>

                                
                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                                </div>

                                <div className="notification-list">
                                    
                                    <a  className="dropdown-item notify-item">
                                        <div className="media">
                                            <img className="d-flex mr-2 rounded-circle" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32"/>
                                            <div className="media-body">
                                                <h5 className="m-0 font-14">Erwin Brown</h5>
                                                <span className="font-12 mb-0">UI Designer</span>
                                            </div>
                                        </div>
                                    </a>

                                    
                                    <a  className="dropdown-item notify-item">
                                        <div className="media">
                                            <img className="d-flex mr-2 rounded-circle" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32"/>
                                            <div className="media-body">
                                                <h5 className="m-0 font-14">Jacob Deo</h5>
                                                <span className="font-12 mb-0">Developer</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                            </div>



                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">

                                            </div>
                                            <h4 className="page-title">{document.title}</h4>
                                        </div>
                                    </div>
                                </div>
                                <Routes />


                            </div>


                        </div>

                        {/* <footer className="footer footer-alt" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                {new Date().getFullYear()} © Sttrack - Simply Simple, All Rights Reserved.
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-right footer-links d-none d-md-block">
                                    <a>About</a>
                                    <a>Support</a>
                                    <a>Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer> */}


                    </div>

                </div> </> : <div id="preloader" style={{ display: 'block' }}>
                <div id="status" style={{ display: 'block' }}>
                    <div className="bouncing-loader"  ><div ></div><div ></div><div ></div></div>
                </div>
            </div>}
        </React.Fragment>

    )
}

export default Panel;
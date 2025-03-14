import Navbar from "./Navbar";

function Layout({children, showNavbar = true}) {
    return (
        <div>
            {showNavbar && <Navbar/>}
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout;
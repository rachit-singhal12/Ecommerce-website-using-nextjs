import React from "react"
import Header from "./Header"
import SideBar from "./SideBar"

function Layout({children}) {
  return (
    <>
      <Header/>
      <div className="container-md mt-4">
        <div className="row g-3">
            <div className="col-md-3 d-none d-md-block">
                <SideBar/>
            </div>
            <div className="col-12 col-md-9">
                {children}
            </div>
        </div>
      </div>
    </>
  )
}

export default Layout
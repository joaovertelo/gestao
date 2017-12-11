import '../common/template/dependecies'
import React from 'react'

import Header from '../common/template/header'
import SideBar from '../common/template/sideBar'
import Footer from '../common/template/footer'
import Messages from '../common/msg/messages'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <SideBar />
                <div className="content-wrapper">
                    {this.props.children}
                </div>
                <Footer />
                <Messages />
            </div>
        )
    }
}
export default App
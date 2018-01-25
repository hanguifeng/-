import React, { Component } from 'react';
import { Modal } from 'antd';
import { borderGrey } from '../../styles/color/index';
import logo from '../../picture/logo.svg';
import yimai from '../../picture/yimai.png';
import Login from '../login';
import Nav from './Nav';
import './App.css';

class App extends Component {
  state = {
    visible: false,
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <header style={{ backgroundColor: borderGrey }}>
          <div style={{ width: '100%', display: 'flex', boxShadow: '1px 1px black', marginLeft: '85%' }}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {this.setState({ visible: true })}}
            >
              {'登录'}
            </div>
            &nbsp;
            <span>{'|'}</span>
            &nbsp;
            <div style={{ cursor: 'pointer' }}>{'注册'}</div>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={yimai} style={{ width: '100%', height: 200 }} />
        </header>
        <Login visible={this.state.visible} onCancel={this.handleCancel}/>
        <Nav />
      </div>
    );
  }
}

export default App;

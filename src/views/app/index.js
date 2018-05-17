import React, { Component } from 'react';
import { graphql } from 'react-relay';
import { createQueryRenderer } from 'store/relay';
import store from 'store';
import PageHeader from '../pageHeader';
import Nav from '../nav';
import styles from './styles.scss';

type Props = {
  children: ?[React.Element],
}

class App extends Component {
  props: Props;
  state = {
    visible: false,
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { children } = this.props;
    const userID = store.getState().loginReducer.userID || "";

    return (
      <div>
        <PageHeader params={{ userID }} />
        <div className={styles.mainPage}>
          <Nav />
          <div>{children}</div>
        </div>
      </div>
    );
  }
}

const AppQuery = graphql`
  query app_Query {
    viewer {
      id
    }
  }
`;

const AppContainer = createQueryRenderer(App, AppQuery);

export default AppContainer;

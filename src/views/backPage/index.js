import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Layout } from 'antd';
import store from 'store';
import setMenuState from 'store/redux/actions/menu';
import styles from './styles.scss';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
type Props = {
  children: ?[React.Element],
};

class BackPage extends Component {
  props: Props;
  state={
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  handleClick = (e) => {
    store.dispatch(setMenuState(e.key));
    this.context.router.push({
      pathname: `/backpage/${e.key}`,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <Layout style={{ width: 200, height: 755 }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div style={{ color: 'white', fontSize: 22, fontWeight: 600, padding: '30px 0 10px 53px' }}>后台管理</div>
            <Menu
              mode="inline"
              theme="dark"
              onClick={this.handleClick}
              selectedKeys={[store.getState().menuReducer.key || 'newsManager']}
            >
              <Menu.Item key="newsManager">
                <Icon type="file-text" />
                <span>新闻管理</span>
              </Menu.Item>
              <Menu.Item key="commoditiesManager">
                <Icon type="appstore" />
                <span>义卖物品管理</span>
              </Menu.Item>
              <Menu.Item key="projectManager">
                <Icon type="exception" />
                <span>捐助项目管理</span>
              </Menu.Item>
              <Menu.Item key="userManager">
                <Icon type="user" />
                <span>会员管理</span>
              </Menu.Item>
              <Menu.Item key="sotryManager">
                <Icon type="book" />
                <span>爱心故事管理</span>
              </Menu.Item>
              <SubMenu key="dataBase" title={<span><Icon type="database" /><span>安全设置</span></span>}>
                <Menu.Item key="dataBaseCopy">数据库备份</Menu.Item>
                <Menu.Item key="dataBaseReset">数据库还原</Menu.Item>
              </SubMenu>
              <Menu.Item key="announcementManager">
                <Icon type="notification" />
                <span>公告管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
        <div>{children}</div>
      </div>
    );
  }
}
BackPage.contextTypes = { router: PropTypes.object.isRequired };
  
export default BackPage;

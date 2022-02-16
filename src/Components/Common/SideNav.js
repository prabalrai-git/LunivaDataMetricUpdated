import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MenuRoute, settingsMenu, dataMetricCon } from '../../Data/MenuRoute'
import { NavLink } from 'react-router-dom'
import comlogo from '../../assets/images/logobig.png';
import comlogo1 from '../../assets/images/logosmall.png';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = (props) => {
  const { statePass } = props
  const data = MenuRoute;
  const menuData = settingsMenu;
  const dataMetricdata = dataMetricCon;
  const [collpsed, setcollpsed] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [dataMetric, setdataMetric] = useState(true);



  function oncollpse() {
    setcollpsed(!collpsed);
  }

  useEffect(() => {
    statePass(collpsed)
  }, [collpsed])

  useEffect(() => {
    setShowSettings(!menuData.every(vendor => vendor['isactive'] === false));
    setdataMetric(!dataMetricdata.every(vendor => vendor['isactive'] === false));
  }, [])

  // console.log(dataMetric);
  return (
    <SideNavContainer>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={'100vh'}
        

      >
        <Sider collapsible collapsed={collpsed} onCollapse={oncollpse} className='sideNav' >
          <div className="logo">
            {
              collpsed === true ?
                <img src={comlogo1} alt="luniva" /> :
                <img src={comlogo} alt="luniva" />
            }
          </div>

          <Menu mode="inline" defaultSelectedKeys={['1']}  style={{ background: 'var(--secondaryBackground)', paddingBottom: '15%' }}>
            {
              data.length !== 0 ?
                (
                  data.map(e => {
                    if (e.isactive) {
                      return (
                        <Menu.Item key={e.key} icon={<i className={e.icon}></i>}>
                          <NavLink to={e?.path} className='navLInk' >
                            {e.name}
                          </NavLink>
                        </Menu.Item>
                      )
                    }
                  })
                ) : ''
            }

            {
              showSettings ? (
                <SubMenu key="set1" title='Settings' icon={<i className='icon-line2-settings'></i>}>
                  {
                    menuData.map(e => {
                      if (e.isactive) {
                        return (
                          <Menu.Item key={e.key} icon={<i className={e.icon}></i>}>
                            <NavLink to={e?.path} className='navLInk' >
                              {e.name}
                            </NavLink>
                          </Menu.Item>
                        )
                      }
                    }
                    )
                  }
                </SubMenu>
              ) : ''
            }

            {
              dataMetric ? (
                <SubMenu key="set2" title='datametric' icon={<i className='icon-line2-settings'></i>}>
                  {
                    dataMetricdata.map(e => {
                      if (e.isactive) {
                        return (
                          <Menu.Item key={e.key} icon={<i className={e.icon}></i>}>
                            <NavLink to={e?.path} className='navLInk' >
                              {e.name}
                            </NavLink>
                          </Menu.Item>
                        )
                      }
                    }
                    )
                  }
                </SubMenu>
              ) : ''
            }

          </Menu>
        </Sider>
      </Scrollbars>
    </SideNavContainer>
  )
}

export default SideNav

const SideNavContainer = styled.div`
  height: 100%;
  padding: 20px 0;
    background-color: var(--secondaryBackground);
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    position: fixed;
    z-index: 100;
    
  .logo{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 55px;
    padding-bottom: 10px;
 
    img{
      height: 100%;
    }
  }
  .navLInk{
    display: flex;
    gap: 20px;
    font-size: 16px;
    align-items: center;
    text-transform: capitalize;
   
    i{
      font-size: 20px;
      color: #464343;
    }
  }
  .ant-layout-sider{
    background-color: var(--secondaryBackground);;
  }
  .ant-layout-sider-trigger{
    background-color: var(--primary);
  }
  .ant-menu-title-content{
    font-size: 16px;
  }
  .ant-menu-item:active{
    color: var(--primary);
    background-color: #f7f1e6;
  }  
  .ant-menu-item-selected a, .ant-menu-item-selected a:hover {
    color: var(--primary);
  }
  .ant-menu-inline, .ant-menu-vertical{
    border-right: none;
  }
  .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after{
    border-right: 3px solid var(--primary);
  }
  
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
    background-color: #f7f1e6;
  }
  .ant-menu-item a:hover{
    color: var(--primary);
  }
  .ant-menu-light .ant-menu-item:hover{
    color: var(--primary);
  }
  .ant-menu-item .ant-menu-item-icon{
    color: var(--primary)
  }
  .ant-menu-submenu-title .ant-menu-item-icon{
    color: var(--primary);
  }
  .ant-menu-light .ant-menu-submenu-title:hover{
    color: var(--primary);
  }
  .ant-menu-sub.ant-menu-inline{
    background-color: var(--secondaryBackground);
  }
  
`
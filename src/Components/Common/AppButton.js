import { Button } from 'antd/lib/radio'
import React from 'react'
import styled from 'styled-components'

const AppButton = (props) => {
  return (
    <AppButtonContainer>
    { props.primaryBtn && 
      <Button className='primary-btn' shape="circle" onClick={props.buttonOnClick}>
        {props.buttonTitle}
      </Button>
    }
    { props.priamryOutlineBtn && 
      <Button className='primary-btn-outline' shape="circle" onClick={props.buttonOnClick}>
        {props.buttonTitle}
      </Button>
    }
      {/* 
      <Button className='primary-btn-outline' shape="circle" onClick={props.buttonOnClick}>
        {props.buttonTitle}
      </Button> */}
    </AppButtonContainer>
  )
}

export default AppButton

const AppButtonContainer = styled.div`
  .primary-btn{
    background-color: var(--primary);
    color: #fefefe;
    border-radius: 3px!important;
    width: auto;
    min-height: 30PX;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0 10px;
    letter-spacing: 1px;
    justify-content: center;
    font-weight: 400;
    border: 1px solid var(--primary);
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 19%);
    &:hover{
      /* background-color: transparent; */
      opacity: 0.9;
      color: #fefefe;
      border: 1px solid var(--primary);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  }
  .primary-btn-outline{
    background-color: transparent;
    color:  var(--secondary);
    border-radius: 3px!important;
    min-height: 30PX;
    display: flex;
    align-items: center;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 400;
    border: 1px solid  var(--secondary);
    box-shadow: 0 4px 14px 0 rgb(0 118 255 / 9%);
    &:hover{
      background-color:   var(--secondary);
      color: #fefefe;
      border: 1px solid var(--secondary);
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
    }
  }
`

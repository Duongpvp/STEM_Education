import React from 'react'
import Logo from '../../assets/img/LogoSign.png'
import { Icon } from '@iconify/react';
import './LogoSign.css'

const LogoSign = () => {
  return (
    <div className="LogoSign">
        <img src={Logo} alt="Logo Sign"/>
        <div className="SearchInput">
          <input type="text" placeholder='Seach something...'/>
          <div className="s-icon">
            <Icon icon="uil:search"></Icon>
          </div>
        </div>
    </div>
  )
}

export default LogoSign
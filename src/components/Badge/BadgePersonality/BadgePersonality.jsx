import React, { useState, useRef } from 'react'
import Icon from 'cozy-ui/transpiled/react/Icon'

// IMG
import iconPersonality from '../../../assets/icons/icon-curiose-trait-perso.svg'
import DropdownIcon from 'cozy-ui/transpiled/react/Icons/Dropdown'
import { largeSize } from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'

const BadgePersonality = () => {
  const [toggled, setToggled] = useState(false)

  const refHideText = useRef(null)

  const showElement = () => {
    setToggled(!toggled)
  }

  return (
    <div className="badgePersonality">
      <div className="headerPersonality">
        <div className="iconPersonality">
          <Icon icon={iconPersonality} size={largeSize} />
        </div>
        <div className="headlinePersonality">
          <h3>Trait de personnalité dominant</h3>
          <p>Social</p>
        </div>
      </div>
      <div className="contentPersonality">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          finibus enim in justo facilisis, at placerat tellus facilisis. Sed
          consectetur rutrum purus, hendrerit rhoncus urna euismod ac. Mauris
          pharetra nulla quis nibh volutpat sollicitudin. Suspendisse auctor
          varius sem vel pellentesque. Aliquam pellentesque orci leo, finibus
          condimentum nunc volutpat a. Cras ultricies finibus lorem. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Morbi sit amet nibh vitae elit feugiat imperdiet vitae hendrerit
          risus.
        </p>
        <div className="dropdownPersonality">
          <div className="dropdownContainer">
            <div className="dropdownElement" onClick={() => showElement()}>
              <div className="dropdownText">
                <p>Tes caractéristiques principales</p>
                <p
                  className={`hideElement ${toggled ? 'showElement' : ''}`}
                  ref={refHideText}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus finibus enim in justo facilisis, at placerat tellus
                  facilisis. Sed consectetur rutrum purus, hendrerit rhoncus
                  urna euismod ac. Mauris pharetra nulla quis nibh volutpat
                  sollicitudin. Suspendisse auctor varius sem vel pellentesque.
                  Aliquam pellentesque orci leo, finibus condimentum nunc
                  volutpat a. Cras ultricies finibus lorem. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Morbi sit amet nibh vitae elit feugiat imperdiet vitae
                  hendrerit risus.
                </p>
              </div>
              <div className={`iconDropdown ${toggled ? 'rotateIcon' : ''}`}>
                <Icon icon={DropdownIcon} />
              </div>
            </div>
            <div className="dropdownElement">
              <div className="dropdownText">
                <p>Tes points forts</p>
              </div>
              <div className="iconDropdown">
                <Icon icon={DropdownIcon} />
              </div>
            </div>
            <div className="dropdownElement">
              <div className="dropdownText">
                <p>Les activités dans lesquelles tu es à l'aise</p>
              </div>
              <div className="iconDropdown">
                <Icon icon={DropdownIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BadgePersonality

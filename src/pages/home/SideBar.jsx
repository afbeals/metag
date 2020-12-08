// External
import { useState, useEffect } from 'react';
import { SvgIcon } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Search,
  CategoryOutlined,
  LocalOfferOutlined,
  AccountCircleOutlined,
  ChevronLeftOutlined,
  EditOutlined,
} from '@material-ui/icons';

// Internal
import styles from '~Styles/abstract/_variables';
import ErrorBoundary from '~Components/ErrorBoundary';
import { constructClass } from '~GlobalUtil/normalize';
import {
  List,
  SideBar as SideBarStyled,
  Selector,
  SelectorMain,
  SelectorBottom,
  SelectorIcon,
} from './SideBar_';
import {
  Categories,
  Search as SearchComponent,
  Tags,
  Profile,
  Editor,
} from './sideBar/';

// Constants
const classname = 'sideBar';
const selectorOptions = {
  SEARCH: {
    label: 'search',
    value: 'search',
    icon: Search,
    color: 'secondary',
    Comp: <SearchComponent />,
  },
  CAT: {
    label: 'categories',
    value: 'cat',
    icon: CategoryOutlined,
    color: 'secondary',
    Comp: <Categories />,
  },
  TAG: {
    label: 'tags',
    value: 'tag',
    icon: LocalOfferOutlined,
    color: 'secondary',
    Comp: <Tags />,
  },
  MOVIE: {
    label: 'editor',
    value: 'edit',
    color: 'secondary',
    icon: EditOutlined,
    Comp: <Editor />,
  },
  PROFILE: {
    label: 'profile',
    value: 'prf',
    bottom: true,
    icon: AccountCircleOutlined,
    color: 'secondary',
    Comp: <Profile />,
  },
};

const SideBar = () => {
  const [isOpen, updateIsOpen] = useState(false);
  const [currentView, updateCurrentview] = useState(null);

  const baseClass = constructClass([classname, isOpen && 'open']);

  const handleUpdateIsOpen = (pref = null) => {
    updateIsOpen(prev => pref || !prev);
  };

  const handleUpdateCurrentview = (val = null) => {
    if (val !== currentView) updateCurrentview(val);
  };

  useEffect(
    () => (currentView ? handleUpdateIsOpen(true) : handleUpdateIsOpen(false)),
    [currentView]
  );

  return (
    <ErrorBoundary>
      <SideBarStyled className={baseClass}>
        <Selector isOpen={currentView} className={`${classname}__selector`}>
          <SelectorMain>
            {Object.entries(selectorOptions).map(
              ([key, { label, value, icon: Icon, color = '' }]) => (
                <SelectorIcon
                  role='button'
                  key={`${label}-${value}`}
                  onKeyDown={() => handleUpdateCurrentview(key)}
                  tabIndex={0}
                  selected={
                    currentView && value === selectorOptions[currentView].value
                  }
                  onClick={() => handleUpdateCurrentview(key)}
                >
                  <SvgIcon component={Icon} color={color} fontSize='inherit' />
                  <p>{label}</p>
                </SelectorIcon>
              )
            )}
          </SelectorMain>
          <SelectorBottom isOpen={currentView}>
            <SelectorIcon
              role='button'
              onKeyDown={() => handleUpdateCurrentview()}
              tabIndex={0}
              onClick={() => handleUpdateCurrentview()}
              className={`${currentView ? '' : 'hide'}`}
            >
              <SvgIcon
                component={ChevronLeftOutlined}
                color='secondary'
                fontSize='inherit'
              />
              <p>close</p>
            </SelectorIcon>
          </SelectorBottom>
        </Selector>
        <List isOpen={currentView}>
          <TransitionGroup component={null}>
            <CSSTransition
              timeout={Number(`${styles.animSpeed.replace('.', '')}0`)}
              key={currentView}
              classNames='fade'
            >
              <div className={'trans'}>
                {currentView && selectorOptions[currentView].Comp}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </List>
      </SideBarStyled>
    </ErrorBoundary>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;

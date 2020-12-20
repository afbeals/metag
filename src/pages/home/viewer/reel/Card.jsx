// External
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { string, array, number, func } from 'prop-types';

// Internal
import constants from '~GlobalUtil/constants';
import { convertSecToTime } from '~GlobalUtil/normalize';
import {
  Card as CardStyled,
  Tags,
  ImageWrapper,
  InfoLine,
  Pill,
  AltGroups,
} from './Card_';
import { getTagsList } from '~Modules/tags/selectors';
import { getCategoriesList } from '~Modules/categories/selectors';
import { getGroupsList } from '~Modules/groups/selectors';
import { ErrorBoundary, ToolTip } from '~Components/';

// Constants
const classname = 'card';
const {
  API: {
    ROOT,
    MOVIES: {
      GET: { IMG },
    },
  },
} = constants;

const Card = props => {
  const {
    name,
    tag_ids,
    category_id,
    movie_duration,
    group_id,
    alt_group,
    id,
    selectMovie,
    selectedId,
  } = props;
  const [isHover, updateIsHover] = useState(false);
  const catList = useSelector(getCategoriesList);
  const tagList = useSelector(getTagsList);
  const groupList = useSelector(getGroupsList);

  return (
    <ErrorBoundary>
      <CardStyled
        className={classname}
        selected={selectedId === id}
        onMouseOver={() => updateIsHover(true)}
        onMouseOut={() => updateIsHover(false)}
        onBlur={() => updateIsHover(false)}
        onFocus={() => updateIsHover(true)}
        onClick={() => selectMovie(id)}
      >
        <ImageWrapper>
          <img
            src={`${ROOT}${IMG}?movie_id=${id}${isHover ? '&type=gif' : ''}`}
            alt={`${name}`}
          />
          <div className='duration'>{convertSecToTime(movie_duration)}</div>
        </ImageWrapper>
        <InfoLine>
          <div className={'name'}>{name}</div>
          <div className='groupCatWrapper'>
            {group_id && (
              <div className='group'>
                <ToolTip title={groupList[group_id].name} position='top'>
                  {groupList[group_id].name}
                </ToolTip>
              </div>
            )}
            <div className='category'>{catList[category_id].name}</div>
          </div>
        </InfoLine>
        <AltGroups>
          {alt_group.length > 0 && (
            <div className='altWrapper'>
              <span className='altWrapper__ft'>Ft.</span>
              <ToolTip
                title={alt_group.map(ag => groupList[ag].name).join(', ')}
                position='top'
              >
                <p className='altWrapper__content'>
                  {alt_group.map(ag => groupList[ag].name).join(', ')}
                </p>
              </ToolTip>
            </div>
          )}
        </AltGroups>
        <Tags>
          {tag_ids.map(tag => (
            <Pill
              key={tag}
              label={tagList[tag].name}
              color='secondary'
              size='small'
            />
          ))}
        </Tags>
      </CardStyled>
    </ErrorBoundary>
  );
};

Card.defaultProps = {
  tag_ids: [],
  alt_group: [],
  group_id: null,
  selectedId: null,
};
Card.propTypes = {
  img: string.isRequired,
  name: string.isRequired,
  tag_ids: array,
  category_id: number.isRequired,
  group_id: number,
  alt_group: array,
  movie_duration: string.isRequired,
  id: number.isRequired,
  selectMovie: func.isRequired,
  selectedId: number,
};

export default Card;

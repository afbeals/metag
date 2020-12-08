// External
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { string, array, number, func } from 'prop-types';

// Internal
import constants from '~GlobalUtil/constants';
import {
  Card as CardStyled,
  Tags,
  ImageWrapper,
  InfoLine,
  Pill,
} from './Card_';
import { getTagsList } from '~Modules/tags/selectors';
import { getCategoriesList } from '~Modules/categories/selectors';
import ErrorBoundary from '~Components/ErrorBoundary';

// Constants
const classname = 'card';
const convertSecToTime = sec => {
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec - hrs * 3600) / 60);
  let seconds = sec - hrs * 3600 - min * 60;
  seconds = Math.round(seconds * 100) / 100;

  const hrsStr = hrs < 10 ? '0' + hrs : hrs;
  const minStr = min < 10 ? '0' + min : min;
  const secStr = seconds < 10 ? '0' + seconds : seconds;
  return `${hrsStr}:${minStr}:${secStr}`;
};
const {
  API: {
    ROOT,
    MOVIES: {
      GET: { IMG },
    },
  },
} = constants;

const Card = ({
  movie_name,
  tag_ids,
  category_id,
  movie_duration,
  id,
  selectMovie,
  selectedId,
}) => {
  const [isHover, updateIsHover] = useState(false);
  const catList = useSelector(getCategoriesList);
  const tagList = useSelector(getTagsList);

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
            alt={`${movie_name}`}
          />
          <div className='duration'>{convertSecToTime(movie_duration)}</div>
        </ImageWrapper>
        <InfoLine>
          <div className={'name'}>{movie_name}</div>
          <div className='category'>{catList[category_id].name}</div>
        </InfoLine>
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
  selectedId: null,
};
Card.propTypes = {
  img_src: string.isRequied,
  movie_name: string.isRequired,
  tag_ids: array,
  category_id: number.isRequired,
  movie_duration: number.isRequired,
  id: number.isRequired,
  selectMovie: func.isRequired,
  selectedId: number,
};

export default Card;

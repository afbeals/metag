// External
import { useState } from 'react';
import { number } from 'prop-types';

// Internal
import { useMovies } from '~Modules/movies/hooks';
import { useCategoriesStore } from '~Modules/categories/hooks';
import { useTagsStore } from '~Modules/tags/hooks';
import { useGroupsHook } from '~Modules/groups/hooks';
import { convertSecToTime } from '~GlobalUtil/normalize';
import { Info as InfoStyled, Opener, Details } from './Info_';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';
import { ToolTip } from '~Components/';

// Constants
const Info = ({ selectedId }) => {
  const [isOpen, updateIsOpen] = useState(false);
  const { movieList } = useMovies();
  const { catList } = useCategoriesStore();
  const { tagsList } = useTagsStore();
  const { groupList } = useGroupsHook();

  const {
    tag_ids: tags = [],
    alt_group: alts = [],
    movie_duration: duration = 0,
    category_id: catId = null,
    group_id: groupId = null,
    notes = null,
    name = '',
  } = movieList[selectedId] || {};

  return (
    <InfoStyled>
      <div className='title'>
        Details:{' '}
        <Opener
          isopen={isOpen ? 1 : undefined}
          onClick={() => updateIsOpen(prev => !prev)}
        >
          <DownArrow fontSize='inherit' />
        </Opener>
      </div>
      {!!selectedId && (
        <Details isopen={isOpen ? 1 : undefined} className='details'>
          <div className='line name'>
            <span>name: </span>
            <p>{name}</p>
          </div>
          <div className='line groups'>
            <span>groups: </span>
            <div className='primary field'>
              {!groupId && <p style={{ width: 'fit-content' }}>No Group</p>}
              {groupId && (
                <ToolTip title={groupList[groupId].name}>
                  <p className='noStyle'>{groupList[groupId].name}</p>
                </ToolTip>
              )}
            </div>

            <div className='secondary'>
              <div className='field'>
                {alts.map((alt_id, i) => (
                  <ToolTip key={`alt-${alt_id}`} title={groupList[alt_id].name}>
                    <div>
                      <p className='altGroup'>
                        {i !== 0 && ','}
                        {groupList[alt_id].name}
                      </p>
                    </div>
                  </ToolTip>
                ))}
              </div>
            </div>
          </div>
          <div className='line category'>
            <span>category: </span>
            <p>{catList[catId].name}</p>
          </div>
          <div className='line tags'>
            <span>tags: </span>
            {tags.map(tag_id => (
              <p key={`tag-${tag_id}`}>{tagsList[tag_id].name}</p>
            ))}
          </div>
          <div className='line duration'>
            <span>duration: </span>
            <p>{convertSecToTime(duration)}</p>
          </div>
          <div className='line notes'>
            <span>Notes: </span>
            <p>{notes}</p>
          </div>
        </Details>
      )}
    </InfoStyled>
  );
};

Info.defaultProps = {
  selectedId: '',
};

Info.propTypes = {
  selectedId: number,
};

export default Info;

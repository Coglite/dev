import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Classes, Button, ButtonGroup } from '@blueprintjs/core';
import cx from 'classnames';
import {
  removeMissions as removeMissionsAC,
  sortMissions as sortMissionsAC,
  filterMissions as filterMissionsAC,
} from '../../actions';
import {
  getMissionTotalCount, getMissionSelectedCount, getMissionCount,
  getMissionsAvailableFilters, getMissionsFilter,
  getMissionsAvailableSorts, getMissionsSort,
} from '../../selectors';
import { Header, HeaderLeft, HeaderRight } from '../header';

const Toolbar = ({
  totalCount, selectedCount, count,
  removeMissions,
  sortMissions, sort, availableSorts,
  filterMissions, filter, availableFilters,
}) => {
  const hasMissions = totalCount > 1;
  const hasSelection = selectedCount > 0;

  const icon = (id) => {
    if (sort.id !== id) return '';
    return sort.direction ? 'sort-asc' : 'sort-desc';
  }

  return (
    <Header>
      <HeaderLeft>
        { hasMissions
            ? <code>#{count} mission(s) on {totalCount}</code>
            : <code>no mission</code>
        }
        &nbsp;
        { hasSelection
            ? <code>#{selectedCount} selected</code>
            : <code>no selection</code>
        }
      </HeaderLeft>
      <HeaderRight>
        { hasSelection
            ? <Button
                text={`remove selected missions (#${selectedCount})`}
                icon="trash"
                className={cx(Classes.INTENT_DANGER, Classes.MINIMAL)}
                onClick={() => removeMissions()}
              />
            : null
        }
        &nbsp;&nbsp;&nbsp;
        <ButtonGroup minimal>
          {availableSorts.map(s => <Button key={s} active={s === sort.id} text={s} icon={icon(s)} onClick={() => sortMissions(s)} />)}
        </ButtonGroup>
        &nbsp;&nbsp;&nbsp;
        <ButtonGroup minimal>
          {availableFilters.map(f => <Button key={f} active={f === filter} text={f} onClick={() => filterMissions(f)} />)}
        </ButtonGroup>
      </HeaderRight>
    </Header>
  );
};

Toolbar.propTypes = {
  totalCount: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  removeMissions: PropTypes.func.isRequired,
  sortMissions: PropTypes.func.isRequired,
  sort: PropTypes.object,
  availableSorts: PropTypes.array,
  filterMissions: PropTypes.func.isRequired,
  filter: PropTypes.string,
  availableFilters: PropTypes.array,
};

const mapDispatchToProps = {
  removeMissions: removeMissionsAC,
  sortMissions: sortMissionsAC,
  filterMissions: filterMissionsAC,
};

const mapStateToProps = (state) => ({
  ...state,
  totalCount: getMissionTotalCount(state),
  selectedCount: getMissionSelectedCount(state),
  count: getMissionCount(state),
  filter: getMissionsFilter(state),
  availableFilters: getMissionsAvailableFilters(state),
  sort: getMissionsSort(state),
  availableSorts: getMissionsAvailableSorts(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

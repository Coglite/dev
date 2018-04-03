import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, map, values } from 'ramda';
import { Classes, Button } from '@blueprintjs/core';
import cx from 'classnames';
import glamorous from 'glamorous';
import uuid from 'uuid/v4';
import Company from '../company';
import Worker from '../worker';

const StyledMission = glamorous.div({
  margin: '10px 0',
  width: 250,
  position: 'relative',
});

const StyledActions = glamorous.div({
  position: 'absolute',
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
});

const StyledContent = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& h5': {
    textAlign: 'center',
  }
});

class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
    this.boundUpdateIsHovered = this.updateIsHovered.bind(this);
  }

  updateIsHovered = () => {
    this.setState({ isHovered: !this.state.isHovered });
  }

  render() {
    const { id, name, client, partner, manager, workers, isOpen, isSelected, toggleMission, removeMission } = this.props;
    const cls = cx(
      {
        [Classes.INTENT_SUCCESS]: isSelected,
        [Classes.iconClass('automatic-updates')]: isOpen,
        [Classes.iconClass('box')]: !isOpen,
      },
      Classes.CALLOUT
    );

    return (
      <StyledMission
        onMouseEnter={this.boundUpdateIsHovered}
        onMouseLeave={this.boundUpdateIsHovered}
        className={cls}
      >
        <StyledContent>
          <h5>{name}</h5>
          <Company {...client} />
          { partner ? <Company {...partner} /> : null }
          <Worker {...manager} />
          <div>
            {compose(
              values,
              map((worker) => <Worker key={uuid()} {...worker} isShort />)
             )(workers)
            }
          </div>
        </StyledContent>
        { this.state.isHovered
          ? <StyledActions>
              <Button
                icon={isSelected ? 'star' : 'star-empty'}
                className={cx({[Classes.INTENT_SUCCESS]: isSelected}, Classes.MINIMAL)}
                active={isSelected}
                onClick={() => toggleMission(id)}
              />
              <Button
                icon="trash"
                className={cx(Classes.INTENT_DANGER, Classes.MINIMAL)}
                onClick={() => removeMission(id)}
              />
            </StyledActions>
          : null
        }
      </StyledMission>
    );
  }
}

Mission.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
  partner: PropTypes.object,
  manager: PropTypes.object.isRequired,
  workers: PropTypes.object.isRequired,
  toggleMission: PropTypes.func.isRequired,
  removeMission: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  isOpen: PropTypes.bool,
};

export default Mission;

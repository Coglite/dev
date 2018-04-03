import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { map } from 'ramda';
import { removeMission as removeMissionAC, toggleMission as toggleMissionAC } from '../../actions';
import { getPreparedMissions } from '../../selectors';
import Mission from './mission';
import Toolbar from './toolbar';

const StyledMissions = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '0 15px',
});


const Missions = ({ missions, toggleMission, removeMission }) => (
  <Fragment>
    <Toolbar />
    <StyledMissions>
      {map((mission) => (
          <Mission
            key={mission.id}
            {...mission}
            toggleMission={toggleMission}
            removeMission={removeMission}
          />
        ), missions)
      }
    </StyledMissions>
  </Fragment>
);

Missions.propTypes = {
  missions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  toggleMission: PropTypes.func.isRequired,
  removeMission: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeMission: removeMissionAC,
  toggleMission: toggleMissionAC,
};

const mapStateToProps = (state) => ({
  ...state,
  missions: getPreparedMissions(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Missions);

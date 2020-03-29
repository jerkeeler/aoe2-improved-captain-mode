import { connect } from 'react-redux';

import ActiveDraft from './component';

const mapStateToProps = ({
  defaultReducer: {
    captainName,
  },
  draftsReducer: {
    activeDraftToken,
    activeDraftConfig,
    activeDraftStep,
    role,
  },
}) => ({
  activeDraftToken,
  activeDraftConfig,
  activeDraftStep,
  captainName,
  role,
});

export default connect(mapStateToProps)(ActiveDraft);

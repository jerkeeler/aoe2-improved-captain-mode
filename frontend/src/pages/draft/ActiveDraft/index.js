import { connect } from 'react-redux';

import ActiveDraft from './component';

const mapStateToProps = ({
  draftsReducer: {
    activeDraftToken,
    activeDraftConfig,
    activeDraftStep ,
  },
}) => ({
  activeDraftToken,
  activeDraftConfig,
  activeDraftStep,
});

export default connect(mapStateToProps)(ActiveDraft);

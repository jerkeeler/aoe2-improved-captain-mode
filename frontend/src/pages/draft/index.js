import { connect } from 'react-redux';

import { clearActiveDraft, getDraftConfig } from '../../store/drafts/actions';
import Draft from './component';

const mapStateToProps = ({
  defaultReducer: { captainName, nameConfirmed },
  draftsReducer: { activeDraftToken },
}) => ({
  captainName,
  nameConfirmed,
  activeDraftToken,
});

const mapDispatchToProps = {
  clearActiveDraft,
  getDraftConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Draft);

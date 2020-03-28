import { connect } from 'react-redux';

import DraftPresetsList from './component';

const mapStateToProps = ({ draftsReducer }) => ({
  presets: draftsReducer.draftPresets,
});

export default connect(mapStateToProps)(DraftPresetsList);


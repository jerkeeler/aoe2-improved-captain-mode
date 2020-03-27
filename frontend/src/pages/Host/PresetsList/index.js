import { connect } from 'react-redux';

import DraftPresetsList from './component';

const mapStateToProps = ({ defaultReducer }) => ({
  presets: defaultReducer.draftPresets,
});

export default connect(mapStateToProps)(DraftPresetsList);


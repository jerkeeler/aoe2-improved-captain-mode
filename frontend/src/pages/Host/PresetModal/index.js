import { connect } from 'react-redux';

import { createDraft } from '../../../store/drafts/actions';
import PresetModal from './component';

const mapDispatchToProps = {
  createDraft,
};

export default connect(undefined, mapDispatchToProps)(PresetModal);


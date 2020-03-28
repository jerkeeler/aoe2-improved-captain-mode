import { connect } from 'react-redux';

import DataPrefetch from './component';
import { getMaps, getCivs, getNames } from '../../store/actions';
import { getDraftPresets } from '../../store/drafts/actions';

const mapDispatchToProps = {
  getMaps,
  getCivs,
  getNames,
  getDraftPresets,
};

export default connect(undefined, mapDispatchToProps)(DataPrefetch);

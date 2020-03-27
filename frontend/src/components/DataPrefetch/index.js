import { connect } from 'react-redux';

import DataPrefetch from './component';
import { getMaps, getCivs, getDraftPresets } from '../../store/actions';

const mapDispatchToProps = {
  getMaps,
  getCivs,
  getDraftPresets,
};

export default connect(undefined, mapDispatchToProps)(DataPrefetch);

import { connect } from 'react-redux';

import DataPrefetch from './component';
import { getMaps, getCivs } from '../../store/actions';

const mapDispatchToProps = {
  getMaps,
  getCivs,
};

export default connect(undefined, mapDispatchToProps)(DataPrefetch);

import { connect } from 'react-redux';

import NameNavItem from './component';

const mapStateToProps = ({ defaultReducer: { captainName }}) => ({
  captainName,
});

export default connect(mapStateToProps)(NameNavItem);


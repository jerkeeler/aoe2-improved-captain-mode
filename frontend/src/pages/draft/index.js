import { connect } from 'react-redux';

import Draft from './component';

const mapStateToProps = ({ defaultReducer: { captainName, nameConfirmed}}) => ({
  captainName,
  nameConfirmed,
});

export default connect(mapStateToProps)(Draft);

import { connect } from 'react-redux';

import { changeCaptainName } from '../../store/actions';
import NameChooser from './component';

const mapStateToProps = ({ defaultReducer: { captainName, names} }) => ({
  names,
  captainName,
});

const mapDispatchToProps = {
  changeCaptainName,
};

export default connect(mapStateToProps, mapDispatchToProps)(NameChooser);

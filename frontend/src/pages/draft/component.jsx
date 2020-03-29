import React from 'react';

import NameChooser from '../../components/NameChooser';
import { socket, joinRoom } from '../../sockets';
import Layout from '../../components/Layout';
import { ROLES } from '../../models';
import DisconnectModal from './DisconnectModal';
import JoinDraftModal from './JoinDraftModal';
import ActiveDraft from './ActiveDraft';

const initialState = {
  disconnect: false,
  disconnectReason: null,
  nameModal: false,
  joinModal: true,
  role: null,
  draftToken: null,
};

class Draft extends React.Component {
  state = {...initialState};

  componentDidMount() {
    const { match: { params: urlToken } } = this.props;
    this.setState({draftToken: urlToken.token});
  }

  componentWillUnmount() {
    const { clearActiveDraft } = this.props;
    clearActiveDraft();
    socket.disconnect();
  }

  join = async (token, name, role) => {
    const { getDraftConfig } = this.props;
    await getDraftConfig(token, role);
    joinRoom(token, name, role);
    socket.on('disconnectMessage', (msg) => this.setState({disconnect: true, disconnectReason: msg}));
  };

  nameModalClose = (captainName) => {
    this.setState({nameModal: false});
    this.join(this.state.draftToken, captainName, this.state.role);
  };

  joinModalClose = (role) => {
    const { nameConfirmed, captainName } = this.props;
    const showNameModal = !nameConfirmed && role === ROLES.CAPTAIN;
    this.setState({
      joinModal: false,
      nameModal: showNameModal,
      role,
    });
    if (!showNameModal)
      this.join(this.state.draftToken, captainName, role);
  };

  render() {
    const { activeDraftToken } = this.props;
    return (
      <Layout>
        <JoinDraftModal handleClose={this.joinModalClose} show={this.state.joinModal} draftToken={this.state.draftToken} />
        <NameChooser handleClose={this.nameModalClose} show={this.state.nameModal} hideCancel={true} />
        <DisconnectModal handleClose={() => {}} show={this.state.disconnect} reason={this.state.disconnectReason} />
        {activeDraftToken && <ActiveDraft />}
      </Layout>
    )
  }
}

export default Draft;

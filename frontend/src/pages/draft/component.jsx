import React from 'react';
import axios from 'axios';

import { joinRoom } from '../../sockets';

import Layout from '../../components/Layout';

class Draft extends React.Component {
  componentDidMount() {
    const { match: { params: urlToken } } = this.props;
    const token = urlToken.token;
    const queryParams = (new URL(document.location)).searchParams;
    axios.get(`/api/drafts?token=${token}`);
    console.log(222222, token, queryParams.get('as'));
  }

  render() {
    return (
      <Layout>
        <h1>Draft</h1>
      </Layout>
    )
  }
}

export default Draft;

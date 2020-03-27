import React from 'react';

class DataPrefetch extends React.Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const { getMaps, getCivs, getDraftPresets } = this.props;
    await Promise.all([
      getMaps(),
      getCivs(),
      getDraftPresets(),
    ]);
    this.setState({loading: false});
  }

  render() {
    const { children } = this.props;
    const { loading } = this.state;
    return loading ? <main><p>loading...</p></main> : <>{children}</>;
  }
}

export default DataPrefetch;

import React from 'react';
import Web3 from 'web3';
import contractInfo from '../contract';

export default class Index extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      notFoundWeb3: false,
      notFoundContract: false,
      attendManager: null,
      events: [],
    };
  }
  componentDidMount() {
    document.title = 'Hello World!';
    if (!('web3' in window)) {
      this.setState({notFoundWeb3: true});
      return;
    }
    const web3 = new Web3(window.web3.currentProvider);
    web3.eth.net.getId().then((id)=>{
      if (!(id in contractInfo.networks)) {
        this.setState({notFoundContract: true});
        return;
      }
      const attendManager = new web3.eth.Contract(contractInfo.abi, contractInfo.networks[id].address);
      this.setState = {attendManager};
      attendManager.getPastEvents('allEvents', {fromBlock: 0}).then((events)=>{
        console.log(events);
        this.setState({events});
      });
    });
  }

  render() {
    if (this.state.notFoundWeb3) {
      return <div>
        <p>Not Found Web3 Provider</p>
      </div>;
    } else if (this.state.notFoundContract) {
      return <div>
        <p>Not Found Contract</p>
      </div>;
    } else {
      return <div>
      </div>;
    }
  }
}

import React from 'react';

export default class Index extends React.Component {
  componentDidMount() {
    document.title = 'Hello World!';
  }

  render() {
    return <div>
      <p>Hello World.</p>
    </div>;
  }
}

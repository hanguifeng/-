import React, { Component } from 'react';
import { Button } from 'antd';

type Props = {
  text: String,
  style: Object,
}

class NormalButton extends Component {
  props: Props;
  state = {};

  render() {
    const { text, style } = this.props;
    return(
      <Button style={{ ...style }} type="primary" htmlType="submit" >
        {text}
      </Button>
    );
  }
}

export default NormalButton;

import React, { Component } from 'react'

class FileUpload extends Component {
  state = {
    uploadValue: 0,
  }

  render() {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100" >
          {this.state.uploadValue} %
        </progress>
        <br />
        <input type="file" onChange={this.props.onUpload} />
      </div>
    )
  }
}
export default FileUpload
import React from "react";
import { Upload, Icon, message, Modal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { IResponseData, IResponseError } from "../services/CommonTypes";

interface IImgUploaderProps {
  value?: string
  onChange?: (imgUrl: string) => void
}

interface IImgState {
  showModal: boolean
}

export default class extends React.Component<IImgUploaderProps, IImgState> {
  state = {
    showModal: false
  }
  private getUploadContent() {
    if (!this.props.value) {
      return (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
    }
    return null
  }

  private getFileList(): UploadFile[] {
    if (this.props.value) {
      return [
        {
          uid: this.props.value,
          name: this.props.value,
          url: this.props.value
        }
      ]
    }
    return []
  }

  async handleRequest(p: any) {
    let formData = new FormData();
    formData.append(p.filename, p.file)
    console.log(p)
    // fetch api
    const request = new Request(p.action, {
      method: "post",
      body: formData
    });
    const resp: IResponseData<string> | IResponseError = await fetch(request).then(resp => resp.json());
    if (resp.err) {
      message.error(resp.err, 1)
    } else {
      // 触发回调
      if (this.props.onChange) {
        this.props.onChange(resp.data!)
      }
      console.log(resp.data)
    }
  }

  render() {
    return (
      <div>
        <Modal visible={this.state.showModal} footer={null} onCancel={() => {
          this.setState({
            showModal: false
          })
        }}>
          <img alt="" style={{ width: '100%' }} src={this.props.value} />
        </Modal>
        <Upload
          action="/api/upload"
          name="imgfile"
          accept=".jpg,.png,.gif,.bmp,.jiff"
          listType="picture-card"
          fileList={this.getFileList()}
          customRequest={this.handleRequest.bind(this)}
          onRemove={() => {
            if (this.props.onChange) {
              this.props.onChange("")
            }
          }}
          onPreview={() => {
            this.setState({
              showModal: true
            })
          }}
        >
          {this.getUploadContent()}
        </Upload>
      </div>
    );
  }
}
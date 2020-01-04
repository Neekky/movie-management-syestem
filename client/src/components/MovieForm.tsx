import React from "react";
import { Form, Input, Button, Checkbox, InputNumber, Switch, message } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { IMovie } from "../services/MovieService";
import ImgUploader from "./ImgUploader";
import { withRouter, RouteComponentProps } from "react-router";

interface IFormProp extends RouteComponentProps {
  form: WrappedFormUtils<any>
  onSubmit: (movie: IMovie) => Promise<string>
  movie?: IMovie
}

const formItemLayout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 22
  },
};

const AllAreas: { label: string, value: string }[] = [
  { label: "中国大陆", value: "中国大陆" },
  { label: "中国香港", value: "中国香港" },
  { label: "中国台湾", value: "中国台湾" },
  { label: "美国", value: "美国" },
  { label: "日本", value: "日本" },
  { label: "泰国", value: "泰国" },
  { label: "印度", value: "印度" },
  { label: "法国", value: "法国" },
  { label: "俄罗斯", value: "俄罗斯" },
  { label: "西班牙", value: "西班牙" },
  { label: "意大利", value: "意大利" }
]
const AreaGroup = Checkbox.Group;

const AllTypes: { label: string, value: string }[] = [
  { label: "喜剧", value: "喜剧" },
  { label: "科幻", value: "科幻" },
  { label: "战争", value: "战争" },
  { label: "爱情", value: "爱情" },
  { label: "灾难", value: "灾难" },
  { label: "动作", value: "动作" },
  { label: "恐怖", value: "恐怖" },
  { label: "奇幻", value: "奇幻" },
  { label: "伦理", value: "伦理" },
  { label: "历史", value: "历史" },
  { label: "悬疑", value: "悬疑" }
]
const TypeGroup = Checkbox.Group;


class MovieForm extends React.Component<IFormProp> {

  private handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.form.validateFields(async errors => {
      if (!errors) {
        const formData = this.props.form.getFieldsValue();
        const result = await this.props.onSubmit(formData as IMovie);
        if (!result) {
          message.success("处理成功", 1, () => {
            // 跳转页面
            this.props.history.push("/movie");
          });
        } else {
          message.error(result);
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
        {...formItemLayout}
      >
        <Form.Item
          label="电影名称"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator<IMovie>("name", {
            rules: [{ required: true, message: "请填写电影名称" }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="海报"
        >
          {getFieldDecorator<IMovie>("poster")(
            <ImgUploader></ImgUploader>
          )}
        </Form.Item>
        <Form.Item
          label="地区"
        >
          {getFieldDecorator<IMovie>("areas", {
            rules: [{ required: true, message: "请选择地区" }]
          })(
            <AreaGroup options={AllAreas}></AreaGroup>
          )}
        </Form.Item>
        <Form.Item
          label="类型"
        >
          {getFieldDecorator<IMovie>("types", {
            rules: [{ required: true, message: "请选择类型" }]
          })(
            <TypeGroup options={AllTypes}></TypeGroup>
          )}
        </Form.Item>
        <Form.Item
          label="时长（分钟）"
        >
          {getFieldDecorator<IMovie>("filmLength", {
            rules: [{ required: true, message: "请填写时长" }]
          })(
            <InputNumber min={1} step={10}></InputNumber>
          )}
        </Form.Item>
        <Form.Item
          label="正在热映"
        >
          {getFieldDecorator<IMovie>("isHot", {
            initialValue: false,
            valuePropName: "checked"
          })(
            <Switch></Switch>
          )}
        </Form.Item>
        <Form.Item
          label="即将上映"
        >
          {getFieldDecorator<IMovie>("isComing", {
            initialValue: false,
            valuePropName: "checked"
          })(
            <Switch></Switch>
          )}
        </Form.Item>
        <Form.Item
          label="经典影片"
        >
          {getFieldDecorator<IMovie>("isClassics", {
            initialValue: false,
            valuePropName: "checked"
          })(
            <Switch></Switch>
          )}
        </Form.Item>
        <Form.Item
          label="描述"
        >
          {getFieldDecorator<IMovie>("description")(
            <Input.TextArea></Input.TextArea>
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 20, offset: 2 }}
        >
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    )
  }
}

type MovieFields = {
  [P in Exclude<keyof IMovie, "_id">]: any
}

function getDefaultField(movie: IMovie):MovieFields {
  const obj:any = {};
  for (const key in movie) {
    obj[key] = Form.createFormField({
      value: movie[key]
    })
  }
  console.log("查看",obj)
  return obj;
}

export default withRouter(Form.create<IFormProp>({
  mapPropsToFields: props => {
    if (props.movie) {
      return getDefaultField(props.movie);
    }

  }
})(MovieForm));
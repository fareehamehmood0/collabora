import React from "react";
import { Form, Input, Button, message } from "antd";

const { TextArea } = Input;

const ContactUsForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    message.success("Message sent successfully!");
    console.log("Form Values:", values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Failed to send message. Please try again.");
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="contact-us-container">
      <div className="form-content">
        <h1>Contact Us</h1>
        <Form
          form={form}
          layout="vertical"
          name="contact_us"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="contact-us-form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please input the subject!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="image-content">
        <img src="contactus.png" alt="Contact Us" />
      </div>
    </div>
  );
};

export default ContactUsForm;

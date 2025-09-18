import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function EditUserModal({ user, onCancel, onSave }) {
  const [form] = Form.useForm();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone !== undefined && user.phone !== null ? user.phone : "",
        website: user.website !== undefined && user.website !== null ? user.website : "",
        company: user.company?.name || "",
      });
      setFavorite(user.favorite || false);
    } else {
      form.resetFields();
      setFavorite(false);
    }
  }, [user, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedUser = {
        ...user,
        ...values,
        company: { name: values.company },
        favorite,
      };
      onSave(updatedUser);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const toggleFavorite = () => setFavorite((prev) => !prev);

  return (
    <Modal
      open={!!user}
      title={
        <span>
          Edit User{" "}
          <span style={{ cursor: "pointer", marginLeft: 8 }} onClick={toggleFavorite}>
            {favorite ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined style={{ color: "gray" }} />
            )}
          </span>
        </span>
      }
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      {user && (
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default EditUserModal;
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


// import React, { useState } from "react";
// import { Card, } from "antd";
// import { EditOutlined, DeleteOutlined, HeartOutlined, HeartFilled, MailOutlined, PhoneOutlined, GlobalOutlined, EnvironmentOutlined } from "@ant-design/icons";
// import EditUserModal from "./EditUserModal";

// function UserCard({ user, onUpdate, onDelete }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [favorite, setFavorite] = useState(user.favorite || false);

//   const handleSave = (updatedUser) => {
//     onUpdate(updatedUser);
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <Card
//         style={{ width: 320, margin: "12px", borderRadius: "12px" }}
//         cover={
//           <div style={{ textAlign: "center", padding: "10px" }}>
//             <img
//               alt="avatar"
//               src={user.avatar || "https://via.placeholder.com/100"}
//               style={{ borderRadius: "50%", width: 80, height: 80 }}
//             />
//           </div>
//         }
//         actions={[
//           favorite ? (
//             <HeartFilled key="like" style={{ color: "red" }} onClick={() => setFavorite(false)} />
//           ) : (
//             <HeartOutlined key="like" style={{ color: "gray" }} onClick={() => setFavorite(true)} />
//           ),
//           <EditOutlined key="edit" onClick={() => setIsEditing(true)} />,
//           <DeleteOutlined key="delete" onClick={() => onDelete(user.id)} style={{ color: "red" }} />,
//         ]}
//       >
//         <h3>{user.name}</h3>
//         <p style={{ margin: 0, color: "gray" }}>@{user.username}</p>
//         <p style={{ margin: "4px 0", fontWeight: "bold" }}>{user.company?.name}</p>

//         <p><MailOutlined /> {user.email}</p>
//         <p><PhoneOutlined /> {user.phone}</p>
//         <p><GlobalOutlined /> {user.website}</p>
//         <p><EnvironmentOutlined /> {user.address?.street}, {user.address?.city}</p>
//       </Card>

//       {isEditing && (
//         <EditUserModal
//           user={user}
//           onCancel={() => setIsEditing(false)}
//           onSave={handleSave}
//         />
//       )}
//     </>
//   );
// }

// export default UserCard;

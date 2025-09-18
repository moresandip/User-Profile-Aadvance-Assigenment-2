import React from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const avatarUrl = (username) =>
  `https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(username)}.svg?options[mood][]=happy`;

function UserCard({ user, onEdit, onDelete }) {
  return (
    <Card
      cover={<img alt={user.username} src={avatarUrl(user.username)} style={{ padding: 24, height: 160 }} />}
      actions={[
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(user)}>Edit</Button>,
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => onDelete(user.id)}>Delete</Button>
      ]}
    >
      <Card.Meta
        title={user.name}
        description={
          <>
            <div>{user.email}</div>
            <div>{user.company.name}</div>
          </>
        }
      />
    </Card>
  );
}

export default UserCard;

import React, { useState } from "react";
import { Card, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const avatarUrl = (username) =>
  `https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(
    username
  )}.svg?options[mood][]=happy`;

function UserCard({ user, onEdit, onDelete }) {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      className="user-card"
      cover={
        <img
          alt={user.username}
          src={avatarUrl(user.username)}
          style={{ padding: 24, height: 160 }}
        />
      }
      actions={[
        <Button
          type="link"
          icon={liked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
          onClick={() => setLiked(!liked)}
        >
          {liked ? "Liked" : "Like"}
        </Button>,
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(user)}
        >
          Edit
        </Button>,
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(user.id)}
        >
          Delete
        </Button>,
      ]}
    >
      <Card.Meta
        title={user.name}
        description={
          <div style={{ textAlign: "left" }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        }
      />
    </Card>
  );
}

export default UserCard;


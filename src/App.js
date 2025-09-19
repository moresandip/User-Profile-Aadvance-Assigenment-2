import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Spin, message } from "antd";
import UserCard from "./UserCard";
import EditUserModal from "./EditUserModal";
import 'antd/dist/reset.css';
import "./App.css";

const { Header, Content } = Layout;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        message.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const handleEdit = (user) => setEditingUser(user);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    message.success("User deleted");
  };

  const handleSave = (updatedUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
    message.success("User updated");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: 20,textAlign: "center"}}>User Profiles Advanced</Header>
      <Content style={{ padding: 24 }}>
        {loading ? (
          <div className="centered"><Spin size="large" /></div>
        ) : (
          <Row gutter={[16, 16]}>
            {users.map((user) => (
              <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
                <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
              </Col>
            ))}
          </Row>
        )}
        <EditUserModal
          user={editingUser}
          onCancel={() => setEditingUser(null)}
          onSave={handleSave}
        />
      </Content>
    </Layout>
  );
}

export default App;



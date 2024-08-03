// src/components/ProjectPage.jsx
import React, { useState } from "react";
import {
  Card,
  Button,
  Progress,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Meta } = Card;

const generateProjects = (count) => {
  const projects = [];
  for (let i = 1; i <= count; i++) {
    projects.push({
      id: i,
      name: `Project ${i}`,
      leader: `Leader ${i}`,
      mentor: `Mentor ${i}`,
      image: "https://via.placeholder.com/150",
      members: Math.floor(Math.random() * 10) + 1,
      progress: Math.floor(Math.random() * 100),
    });
  }
  return projects;
};

const Projects = () => {
  const [projects, setProjects] = useState(generateProjects(23));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const showAddModal = () => {
    setEditingProject(null);
    setIsModalVisible(true);
  };

  const showEditModal = (project) => {
    setEditingProject(project);
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    if (editingProject) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id ? { ...project, ...values } : project
        )
      );
      message.success("Project updated successfully!");
    } else {
      setProjects([
        ...projects,
        {
          id: projects.length + 1,
          ...values,
          image: URL.createObjectURL(values.image.file),
        },
      ]);
      message.success("Project added successfully!");
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    message.success("Project deleted successfully!");
  };

  return (
    <div className="project-page">
      <div className="header">
        <h1>Projects</h1>
        <Button
          type="primary"
          onClick={showAddModal}
          icon={<PlusOutlined />}
          style={{ marginLeft: "auto" }}
        >
          Add Project
        </Button>
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {projects.map((project) => (
          <Col key={project.id} xs={24} sm={12} md={8}>
            <Card
              cover={<img alt={project.name} src={project.image} />}
              actions={[
                <Button onClick={() => showEditModal(project)}>
                  Change Details
                </Button>,
                <Button onClick={() => deleteProject(project.id)} danger>
                  Delete Project
                </Button>,
              ]}
            >
              <Meta
                title={project.name}
                description={`Leader: ${project.leader} | Mentor: ${project.mentor}`}
              />
              <p>Members: {project.members}</p>
              <Progress percent={project.progress} />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={editingProject ? "Edit Project" : "Add New Project"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleOk}
          initialValues={
            editingProject ? { ...editingProject, image: null } : {}
          }
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Leader"
            name="leader"
            rules={[
              { required: true, message: "Please input the project leader!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Mentor"
            name="mentor"
            rules={[
              { required: true, message: "Please input the project mentor!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Image"
            name="image"
            valuePropName="file"
            getValueFromEvent={(e) => e.file}
            rules={[
              {
                required: !editingProject,
                message: "Please upload the project image!",
              },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects;

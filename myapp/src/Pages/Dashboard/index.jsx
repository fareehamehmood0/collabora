// src/components/CardGrid.jsx
import React from 'react';
import { Card, Col, Row } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const cardData = [
  {
    title: 'Total Students',
    count: 120,
    icon: <UserOutlined />,
  },
  {
    title: 'Total Mentors',
    count: 45,
    icon: <TeamOutlined />,
  },
  {
    title: 'Total Groups',
    count: 300,
    icon: <TeamOutlined />,
  },
  {
    title: 'Total Projects',
    count: 8,
    icon: <DatabaseOutlined />,
  },
  {
    title: 'Progress Projects',
    count: 250,
    icon: <PieChartOutlined />,
  },
  {
    title: 'Finished Projects',
    count: 10,
    icon: <CheckCircleOutlined />,
  },
  // New cards with title and description
  {
    title: 'Upcoming Meetings',
    count: 5,
    icon: <CalendarOutlined />,
    description: 'Meetings scheduled in the near future.',
  },
  {
    title: 'Events Within One Week',
    count: 3,
    icon: <ClockCircleOutlined />,
    description: 'Events happening in the upcoming week.',
  },
];

const previousDiscussions = [
  {
    title: "Discussion 1",
    description: "Details of discussion 1",
    date: "2024-08-01",
  },
  {
    title: "Discussion 2",
    description: "Details of discussion 2",
    date: "2024-08-02",
  },
  {
    title: "Discussion 3",
    description: "Details of discussion 3",
    date: "2024-08-03",
  },
];

const CardGrid = () => {
  return (
    <Row gutter={16} style={{ padding: '30px' }}>
      <Col span={18}>
        <Row gutter={16}>
          {cardData.slice(0, 6).map((data, index) => (
            <Col span={8} key={index}>
              <Card hoverable className="card">
                <div className="card-content">
                  <div className="card-icon">{data.icon}</div>
                  <Meta
                    title={data.title}
                    description={`${data.count} ${data.title.toLowerCase()}`}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={16} style={{ marginTop: '24px' }}>
          {cardData.slice(6).map((data, index) => (
            <Col span={12} key={index}>
              <Card hoverable className="card">
                <div className="card-content">
                  <div className="card-icon">{data.icon}</div>
                  <Meta
                    title={data.title}
                    description={data.description} // Display the description
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={6}>
        <Card title="Previous Discussions" bordered={false}>
          {previousDiscussions.map((discussion, index) => (
            <Card
              type="inner"
              title={discussion.title}
              extra={<span>{discussion.date}</span>}
              style={{ marginBottom: '16px' }}
              key={index}
            >
              <p>{discussion.description}</p>
            </Card>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default CardGrid;

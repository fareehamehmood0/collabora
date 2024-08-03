// EventManagementPage.js
import React, { useState } from "react";
import {
  Calendar,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Typography,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Meta } = Card;
const { TextArea } = Input;
const { Title } = Typography;

const initialEvents = [
  {
    id: 1,
    name: "Project Kickoff Meeting",
    date: "2024-08-10",
    time: "09:00",
    description: "Initial project meeting with the team.",
  },
  {
    id: 2,
    name: "Sprint Planning",
    date: "2024-08-20",
    time: "14:00",
    description: "Planning session for the upcoming sprint.",
  },
];

const EventManagementPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEvent, setEditingEvent] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);

  const handleDateCellRender = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const event = events.find((e) => e.date === dateString);
    return event ? (
      <div style={{ padding: "5px", color: "blue", fontWeight: "bold" }}>
        {event.name}
      </div>
    ) : null;
  };

  const handleDateSelect = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    setSelectedDate(dateString);
    setEditingEvent(events.find((e) => e.date === dateString) || null);
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    form.resetFields();
    setEditingEvent(null);
    setSelectedDate(null);
    setModalVisible(true);
  };

  const handleSaveEvent = (values) => {
    if (!selectedDate) {
      message.error("Please select a date for the event.");
      return;
    }
    const newEvent = {
      id: Date.now(),
      ...values,
      date: selectedDate,
      time: values.time.format("HH:mm"),
    };

    if (editingEvent) {
      setEvents(events.map((e) => (e.id === editingEvent.id ? newEvent : e)));
    } else {
      setEvents([...events, newEvent]);
    }
    setModalVisible(false);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e.id !== editingEvent.id));
    setModalVisible(false);
  };

  const handleExportEvents = () => {
    const doc = new jsPDF();
    doc.text("Event List", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["Event Name", "Date", "Time", "Description"]],
      body: events.map((event) => [
        event.name,
        event.date,
        event.time,
        event.description,
      ]),
    });
    doc.save("events.pdf");
  };

  const handleTodayEvents = () => {
    const today = moment().format("YYYY-MM-DD");
    const todayEvents = events.filter((e) => e.date === today);
    if (todayEvents.length > 0) {
      setTodayEvents(todayEvents);
    } else {
      message.info("No events for today.");
      setTodayEvents([]);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Manage Events</Title>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEvent}>
        Add Event
      </Button>
      <Button
        style={{ marginLeft: "8px" }}
        type="default"
        onClick={handleTodayEvents}
      >
        Today Events
      </Button>
      <Button
        style={{ marginLeft: "8px" }}
        type="default"
        icon={<ExportOutlined />}
        onClick={handleExportEvents}
      >
        Export Events
      </Button>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Title level={3}>Event List</Title>
          <Row gutter={16} style={{ overflowX: "auto" }}>
            {events.map((event) => (
              <Col span={8} key={event.id} style={{ minWidth: "300px" }}>
                <Card
                  title={event.name}
                  extra={
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        setEvents(events.filter((e) => e.id !== event.id))
                      }
                    />
                  }
                  style={{ marginBottom: "16px" }}
                >
                  <Meta
                    description={`Date: ${event.date} | Time: ${event.time}`}
                  />
                  <p>{event.description}</p>
                  <Button
                    type="default"
                    onClick={() => {
                      setSelectedDate(event.date);
                      setEditingEvent(event);
                      setModalVisible(true);
                    }}
                  >
                    Change Details
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {todayEvents.length > 0 && (
          <Col span={24} style={{ marginTop: "16px" }}>
            <Title level={3}>Today's Events</Title>
            <Row gutter={16} style={{ overflowX: "auto" }}>
              {todayEvents.map((event) => (
                <Col span={8} key={event.id} style={{ minWidth: "300px" }}>
                  <Card
                    title={event.name}
                    extra={
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setEvents(events.filter((e) => e.id !== event.id))
                        }
                      />
                    }
                    style={{ marginBottom: "16px" }}
                  >
                    <Meta
                      description={`Date: ${event.date} | Time: ${event.time}`}
                    />
                    <p>{event.description}</p>
                    <Button
                      type="default"
                      onClick={() => {
                        setSelectedDate(event.date);
                        setEditingEvent(event);
                        setModalVisible(true);
                      }}
                    >
                      Change Details
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        )}

        <Col span={24} style={{ marginTop: "16px" }}>
          <Calendar
            dateCellRender={handleDateCellRender}
            onSelect={handleDateSelect}
          />
        </Col>
      </Row>

      <Modal
        title={editingEvent ? "Edit Event" : "Add Event"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={
            editingEvent || { name: "", description: "", time: moment() }
          }
          onFinish={handleSaveEvent}
        >
          <Form.Item
            name="name"
            label="Event Name"
            rules={[
              { required: true, message: "Please enter the event name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[
              { required: true, message: "Please select the event date!" },
            ]}
          >
            <DatePicker
              onChange={(date) =>
                setSelectedDate(date ? date.format("YYYY-MM-DD") : null)
              }
              value={selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null}
            />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[
              { required: true, message: "Please select the event time!" },
            ]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            {editingEvent && (
              <Button
                type="default"
                danger
                onClick={handleDeleteEvent}
                style={{ marginLeft: "8px" }}
              >
                Delete
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventManagementPage;

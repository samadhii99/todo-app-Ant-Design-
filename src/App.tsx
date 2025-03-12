import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import TodoItem from "./components/TodoItem";
import {
  Layout,
  Input,
  Button,
  Switch,
  Typography,
  Divider,
  Empty,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Form,
  Alert,
  theme,
  Badge,
  Tag,
  Tooltip,
  Progress,
  ConfigProvider,
} from "antd";
import {
  PlusOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedDarkMode !== null) {
      // If we have a saved preference, use it
      const isDark = savedDarkMode === "true";
      setDarkMode(isDark);
      applyDarkMode(isDark);
    } else {
      // Otherwise use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
      applyDarkMode(prefersDark);

      // Save this preference
      localStorage.setItem("darkMode", prefersDark.toString());
    }

    // Load todos from localStorage
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Helper function to apply dark mode
  const applyDarkMode = (isDark: boolean) => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    document.body.style.backgroundColor = isDark ? "#141414" : "#f0f2f5";
  };

  // Toggle dark mode
  const toggleDarkMode = (checked: boolean) => {
    // Update state
    setDarkMode(checked);

    // Apply the change to the HTML element
    applyDarkMode(checked);

    // Save the preference
    localStorage.setItem("darkMode", checked.toString());
  };

  const addTodo = () => {
    if (!newTodoTitle.trim()) {
      setErrorMessage("Title cannot be empty.");
      return;
    }
    setErrorMessage("");

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoTitle("");
    setNewTodoDescription("");
    form.resetFields();
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (
    id: string,
    title: string,
    description: string,
    completed: boolean
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description, completed } : todo
      )
    );
  };

  // Calculate task statistics
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}
        >
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Header
              style={{
                padding: "0 0 24px 0",
                background: "transparent",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Space align="center">
                <OrderedListOutlined
                  style={{ fontSize: "28px", color: token.colorPrimary }}
                />
                <Title level={2} style={{ margin: 0 }}>
                  Todo List
                </Title>
                <Badge
                  count={todos.filter((todo) => !todo.completed).length}
                  style={{ marginLeft: "8px" }}
                  overflowCount={99}
                />
              </Space>
              <Space>
                <Text>
                  <CalendarOutlined style={{ marginRight: "8px" }} />
                  {today}
                </Text>
                <Divider type="vertical" />
                <Switch
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              </Space>
            </Header>

            {errorMessage && (
              <Alert
                message={errorMessage}
                type="error"
                showIcon
                closable
                style={{ marginBottom: "16px" }}
                onClose={() => setErrorMessage("")}
              />
            )}

            <Form form={form} layout="vertical" onFinish={addTodo}>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "Title cannot be empty" }]}
              >
                <Input
                  placeholder="What needs to be done?"
                  prefix={<PlusOutlined />}
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={
                  <span>
                    <FileTextOutlined style={{ marginRight: "8px" }} />
                    Description
                  </span>
                }
              >
                <TextArea
                  placeholder="Add details (optional)"
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  icon={<PlusOutlined />}
                >
                  Add Todo
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Card size="small" style={{ marginBottom: "16px" }}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Tasks"
                    value={totalTasks}
                    prefix={<OrderedListOutlined />}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Completed"
                    value={completedTasks}
                    prefix={<CheckCircleOutlined />}
                    suffix={`/ ${totalTasks}`}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Tooltip title={`${completionPercentage}% complete`}>
                    <Progress
                      percent={completionPercentage}
                      size="small"
                      status={
                        completionPercentage === 100 ? "success" : "active"
                      }
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Card>

            <div
              style={{
                maxHeight: "480px",
                overflowY: "auto",
                padding: "4px",
              }}
            >
              {todos.length === 0 ? (
                <Empty
                  description="Your todo list is empty"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                  <Button
                    type="primary"
                    onClick={() => document.querySelector("input")?.focus()}
                  >
                    Add your first task
                  </Button>
                </Empty>
              ) : (
                <Row gutter={[16, 16]}>
                  {todos.map((todo) => (
                    <Col xs={24} sm={24} md={12} key={todo.id}>
                      <TodoItem
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Card>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "transparent",
          }}
        >
          <Space split={<Divider type="vertical" />}>
            <Text>Todo App ©{new Date().getFullYear()}</Text>
            <Text>Created with Ant Design</Text>
            <Tag icon={<ClockCircleOutlined />} color="processing">
              Last updated: {new Date().toLocaleDateString()}
            </Tag>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

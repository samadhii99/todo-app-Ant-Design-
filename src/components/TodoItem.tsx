import React, { useState } from "react";
import { Todo } from "../types/todo";
import { Card, Checkbox, Typography, Space, Button, Input, Modal, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string, description: string, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, editTitle, editDescription, todo.completed);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const showDeleteConfirm = () => {
    setDeleteConfirmVisible(true);
  };

  const handleDeleteConfirm = () => {
    deleteTodo(todo.id);
    setDeleteConfirmVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmVisible(false);
  };

  return (
    <>
      <Card
        size="small"
        style={{ 
          borderLeft: todo.completed ? '4px solid #52c41a' : '4px solid #1677ff',
          transition: 'all 0.3s'
        }}
        actions={isEditing ? [
          <Tooltip title="Save">
            <Button type="text" icon={<SaveOutlined />} onClick={handleSave} />
          </Tooltip>,
          <Tooltip title="Cancel">
            <Button type="text" icon={<CloseCircleOutlined />} onClick={handleCancel} />
          </Tooltip>
        ] : [
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
          </Tooltip>,
          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={showDeleteConfirm} />
          </Tooltip>
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            style={{ marginTop: '4px' }}
          />
          <div style={{ flex: 1 }}>
            {isEditing ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Task title"
                />
                <TextArea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description (optional)"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Space>
            ) : (
              <>
                <Text
                  strong
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.7 : 1,
                    display: 'block',
                    fontSize: '16px'
                  }}
                >
                  {todo.title}
                </Text>
                {todo.description && (
                  <Paragraph
                    style={{
                      margin: '4px 0 0 0',
                      opacity: todo.completed ? 0.6 : 0.85,
                      fontSize: '14px'
                    }}
                  >
                    {todo.description}
                  </Paragraph>
                )}
              </>
            )}
          </div>
        </div>
      </Card>

      <Modal
        title="Confirm Delete"
        open={deleteConfirmVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this todo?</p>
        <Text strong>{todo.title}</Text>
      </Modal>
    </>
  );
};

export default TodoItem;
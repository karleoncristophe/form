import React, { useState } from 'react';
import styled from 'styled-components';
import EditList from './EditList';
import { Card, Modal } from 'antd';

const Container = styled.div`
  display: flex;
  height: 90%;
  margin: 10px;
`;

const CardContent = styled(Card)`
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
`;

const Title = styled.p`
  color: #000000;
  font-size: 1.3rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Text = styled.p`
  color: #3a3939;
  font-size: 1.1rem;
  height: 60px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CardTitle = styled.p`
  color: #222222;
  font-size: 1.3rem;
`;

const CardText = styled.p`
  color: #3a3939;
  font-size: 1.1rem;
`;

const Button = styled.button`
  width: 100%;
`;

const ToDoList = ({
  data,
  editTodo,
  editTitle,
  setEditTitle,
  setEditTodo,
  handleDelete,
  handleUpdateItem,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const closeModalEditVisible = () => {
    setEditModal(false);
  };

  const openModalEditVisible = () => {
    setEditModal(true);
  };

  const closeModalDeleteVisible = () => {
    setDeleteModal(false);
  };

  const openModalDeleteVisible = () => {
    setDeleteModal(true);
  };

  const handleOpenListModal = () => {
    setListModal(true);
  };

  const closeListModal = () => {
    setListModal(false);
  };

  return (
    <Container>
      <CardContent style={{ width: 240 }}>
        <Title>Title: {data?.title}</Title>
        <Text>List: {data?.todo}</Text>
        <Button onClick={handleOpenListModal}>View List</Button>
        <Button onClick={openModalEditVisible}>Open Edit</Button>
        <Button onClick={openModalDeleteVisible}>Delete Item</Button>
        <Modal
          title={`Title: ${data?.title}`}
          centered
          visible={editModal}
          onOk={e => handleUpdateItem(data._id, e) | closeModalEditVisible()}
          onCancel={() => setEditModal(false)}
        >
          <EditList
            data={data}
            modalVisible={openModalEditVisible}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            handleUpdateItem={handleUpdateItem}
          />
        </Modal>
        <Modal
          centered
          visible={listModal}
          onOk={closeListModal}
          onCancel={closeListModal}
          closable={false}
          footer={null}
        >
          <CardTitle>Title: {data?.title}</CardTitle>
          <CardText>List: {data?.todo}</CardText>
        </Modal>
        <Modal
          title="Delete list."
          centered
          visible={deleteModal}
          onOk={e => handleDelete(data._id, e)}
          onCancel={closeModalDeleteVisible}
        >
          Do you want to delete this list?
        </Modal>
      </CardContent>
    </Container>
  );
};

export default ToDoList;

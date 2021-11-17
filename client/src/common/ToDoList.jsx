import styled from 'styled-components';
import EditList from './EditList';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  border-left: none;
  border-right: none;
  border-top: none;
`;
const Text = styled.p`
  color: #ffff;
  font-size: 2rem;
`;

const Button = styled.button``;

const ToDoList = ({
  data,
  editTodo,
  editTitle,
  setEditTitle,
  setEditTodo,
  handleDelete,
  handleOpenEdit,
  handleCloseEdit,
  handleUpdateItem,
  openEdit,
}) => {
  return (
    <Content>
      <Text>{data?.title}</Text>
      <Text>{data?.todo}</Text>

      <EditList
        data={data}
        openEdit={openEdit}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        handleUpdateItem={handleUpdateItem}
        handleOpenEdit={handleOpenEdit}
        handleCloseEdit={handleCloseEdit}
      />
      <Button onClick={e => handleDelete(data._id, e)}>Delete Item</Button>
    </Content>
  );
};

export default ToDoList;

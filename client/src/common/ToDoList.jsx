import styled from 'styled-components';

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

const Input = styled.input``;

const Button = styled.button``;

const TextArea = styled.textarea``;

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.openEdit ? '100%' : '0px')};
  transition: all ease 0.5s;
  overflow: hidden;
`;

const ToDoList = ({
  data,
  editTodo,
  editTitle,
  setEditTitle,
  setEditTodo,
  handleDelete,
  handleOpenEdit,
  handleUpdateItem,
  openEdit,
}) => {
  return (
    <Content>
      <Text>{data?.title}</Text>
      <Text>{data?.todo}</Text>
      <Button onClick={handleOpenEdit}>
        {openEdit ? 'Close Edit' : 'Open Edit'}
      </Button>
      <EditContent openEdit={openEdit}>
        <Input
          placeholder="Edit Title"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
        <TextArea
          placeholder="Edit List"
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
        />
        <Button onClick={e => handleUpdateItem(data._id, e)}>
          Confirm Edit
        </Button>
      </EditContent>
      <Button onClick={e => handleDelete(data._id, e)}>Delete Item</Button>
    </Content>
  );
};

export default ToDoList;

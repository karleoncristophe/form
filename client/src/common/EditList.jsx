import styled from 'styled-components';

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.openEdit ? '100%' : '0px')};
  transition: all ease 0.5s;
  overflow: hidden;
`;
const Input = styled.input``;

const TextArea = styled.textarea``;

const Button = styled.button``;

const EditList = ({
  openEdit,
  setEditTitle,
  editTodo,
  editTitle,
  setEditTodo,
  handleUpdateItem,
  data,
  handleCloseEdit,
  handleOpenEdit,
}) => {
  return (
    <>
      <Button onClick={openEdit ? handleCloseEdit : handleOpenEdit}>
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
    </>
  );
};

export default EditList;

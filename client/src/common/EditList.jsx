import styled from 'styled-components';

const EditContent = styled.div`
  display: flex;
  flex-direction: column;

  transition: all ease 0.5s;
  overflow: hidden;
`;
const Input = styled.input``;

const TextArea = styled.textarea``;

const EditList = ({ setEditTitle, editTodo, editTitle, setEditTodo }) => {
  return (
    <>
      <EditContent>
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
      </EditContent>
    </>
  );
};

export default EditList;

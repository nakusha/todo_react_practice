import { useState } from "react";
import * as S from "./ListItem.styles";
import dayjs from "dayjs";
import { TodoItem } from "../../../api/Todo";

type Props = {
  item: TodoItem;
  deleteListItem: (id: number) => void;
  modifyListItem: (item: TodoItem, content: string) => void;
  completeTodo: (item: TodoItem, isComplete: boolean) => void;
};

const ListItem = ({
  item,
  deleteListItem,
  modifyListItem,
  completeTodo,
}: Props) => {
  const [isModify, setIsModify] = useState(false);

  const [input, setInput] = useState(item.content);

  const toggleModifyMode = () => {
    if (isModify) {
      modifyListItem(item, input);
    }
    setIsModify(!isModify);
  };

  const onCompleteTodo = () => {
    if (isModify) {
    } else {
      completeTodo(item, !item.completed);
    }
  };
  return (
    <S.Container>
      <S.LeftView onClick={onCompleteTodo}>
        <input type="checkbox" checked={item.completed} readOnly />
        <S.ModifyInput
          value={input}
          disabled={!isModify}
          checked={item.completed}
          onChange={(e) => setInput(e.target.value)}
        />
      </S.LeftView>
      {!item.completed && (
        <S.ButtonContainer>
          <p>{dayjs(item.date).format("YYYY.MM.DD")}</p>
          <button onClick={toggleModifyMode}>
            {isModify ? "완료" : "수정"}
          </button>
          <button onClick={() => deleteListItem(item.id)}>삭제</button>
        </S.ButtonContainer>
      )}
    </S.Container>
  );
};

export default ListItem;

import { useDispatch, useSelector } from 'react-redux';
import { Reducer } from '../Types';
import { removeTask, toggleTaskStatus } from '../redux/reducers/todoReducer';
import styled from 'styled-components';
import Remove from '../assets/remove.svg';
import Confirm from '../assets/confirm.svg';
import Cancel from '../assets/cancel.svg';

const Container = styled.ul`
    width: 95%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const TaskContainer = styled.li`
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
    display: flex;
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    padding: 5px 10px 5px 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
const Task = styled.p`
    flex-grow: 1;
    padding: 15px;
    color: red;
`;
const Actions = styled.div`
    display: flex;
    gap: 13px;
    flex-direction: column;
    margin: 10px 5px;
    justify-content: center;
`;
const Button = styled.button`
    display: flex;
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    padding: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    & > img {
        width: 40px;
    }
    &:hover,
    &:focus-visible {
        background-color: rgba(230, 230, 230, 0.8);
        &:active {
            background-color: rgba(20, 20, 20, 0.8);
            color: rgba(230, 230, 230);
            & > img {
                filter: grayscale(1) invert(0.5) brightness(10000%) contrast(1);
            }
        }
    }
`;

const TodoList = () => {
    const tasks = useSelector((reducer: Reducer) => {
        if (reducer.todos.filter === 'completed') return reducer.todos.tasks.filter((task) => task.completed);
        if (reducer.todos.filter === 'uncompleted') return reducer.todos.tasks.filter((task) => !task.completed);
        return reducer.todos.tasks;
    });
    const dispatch = useDispatch();

    return (
        <Container>
            {tasks.map((task) => (
                <TaskContainer key={task.id}>
                    <Task style={task.completed ? { textDecoration: 'line-through', color: 'green' } : {}}>{task.text}</Task>
                    <Actions>
                        <Button onClick={() => dispatch(removeTask(task.id))}>
                            <img src={Remove} alt="Удалить" />
                        </Button>
                        <Button onClick={() => dispatch(toggleTaskStatus(task.id))}>
                            <img src={task.completed ? Confirm : Cancel} alt="Изменить статус" />
                        </Button>
                    </Actions>
                </TaskContainer>
            ))}
        </Container>
    );
};
export default TodoList;

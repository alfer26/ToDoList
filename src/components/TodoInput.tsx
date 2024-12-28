import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/reducers/todoReducer';

const TodoInput = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTask(text))
            setText('');
        } else {
            alert('Некоректный ввод')
        }
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <textarea placeholder="Введите вашу задачу" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Добавить</button>
        </form>
    );
};
export default TodoInput;

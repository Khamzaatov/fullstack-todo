import style from './filter.module.sass'
import { useDispatch } from 'react-redux';
import { fetchTodos } from './../../features/todoSlice';

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilter = (completed) => {
        dispatch(fetchTodos(completed))
    }

    return (
        <div className={style.container}>
          <button onClick={() => handleFilter('All')}>Все</button>
          <button onClick={() => handleFilter('true')}>Завершённые</button>
          <button onClick={() => handleFilter('false')}>Активные</button>
        </div>
    );
};

export default Filter;
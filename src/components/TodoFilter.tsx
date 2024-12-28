import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/reducers/todoReducer';
import { Reducer } from '../Types';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    width: 80%;
    backdrop-filter: blur(5px);
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    margin-top: 15px;
    padding: 5px;
    &:has(> button:focus-visible) {
        background-color: rgba(230, 230, 230, 0.8);
    }
    @media (width < 768px) {
        width: 95%;
    }
`;
const Title = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    filter: drop-shadow(0 0 5px white) drop-shadow(0 0 5px white);
`;
const FiltersContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    transition: 0.2s;
    overflow-y: hidden;
`;
const FiltersButton = styled.button`
    border: 2px solid rgba(0, 0, 0, 0.5);
    margin: 5px;
    border-radius: 1em;
    width: 10em;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    &:hover:not(:disabled),
    &:focus-visible {
        background-color: rgba(230, 230, 230, 0.8);
        &:active {
            background-color: rgba(20, 20, 20, 0.8);
            color: rgba(230, 230, 230);
        }
    }
    &:disabled {
        opacity: 0.5;
        cursor: auto;
    }
`;

const TodoFilter = () => {
    const dispatch = useDispatch();
    const currentFilter = useSelector((reducer: Reducer) => reducer.todos.filter);
    const [showFilters, setShowFilters] = useState(false);
    const [height, setHeight] = useState('0');
    const [observerUpdate, setObserverUpdate] = useState(0);

    const refContainer = useRef<HTMLDivElement>(null);
    const refFiltersContainer = useRef<HTMLDivElement>(null);
    const prevWidthContainer = useRef(0);

    const displayFilter = () => {
        setShowFilters(!showFilters);
        if (!showFilters) {
            const animation = document.getElementById('animationOpen');
            if (animation instanceof SVGAnimateElement) animation.beginElement();
        }
        if (showFilters) {
            const animation = document.getElementById('animationClose');
            if (animation instanceof SVGAnimateElement) animation.beginElement();
        }
    };

    const getColor = () => {
        if (currentFilter === 'completed') return 'green';
        if (currentFilter === 'uncompleted') return 'red';
        return 'black';
    };

    const observer = new ResizeObserver(() => {
        setObserverUpdate(Math.random());
    });

    useEffect(() => {
        window.onload = () => {
            if (!refContainer.current) return;
            observer.observe(refContainer.current);
        };

        return () => {
            observer.disconnect();
        };
    }, []);
    useEffect(() => {
        if (!refFiltersContainer.current) return;
        if (!refContainer.current) return;
        if (prevWidthContainer.current != refContainer.current.clientWidth) {
            if (showFilters) {
                setShowFilters(false);
                const animation = document.getElementById('animationClose');
                if (animation instanceof SVGAnimateElement) animation.beginElement();
            }
        }

        prevWidthContainer.current = refContainer.current.clientWidth;
        setHeight(`${refFiltersContainer.current.scrollHeight}px`);
    }, [observerUpdate]);

    return (
        <Container ref={refContainer}>
            <Title onClick={displayFilter} style={{ color: getColor() }}>
                <p>Фильтр</p>
                <svg width="31" height="12" viewBox="0 0 31 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="none"
                        stroke={getColor()}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        d="M2.5 10L14.9759 2.32252C15.2973 2.12473 15.7027 2.12473 16.0241 2.32252L28.5 10"
                    >
                        <animate
                            id="animationClose"
                            begin="indefinite"
                            attributeName="d"
                            to="M2.5 10L14.9759 2.32252C15.2973 2.12473 15.7027 2.12473 16.0241 2.32252L28.5 10"
                            dur="170ms"
                            fill="freeze"
                        />
                        <animate
                            id="animationOpen"
                            begin="indefinite"
                            attributeName="d"
                            to="M2.5 2L14.9759 9.67748C15.2973 9.87527 15.7027 9.87527 16.0241 9.67748L28.5 2"
                            dur="170ms"
                            fill="freeze"
                        />
                    </path>
                </svg>
            </Title>
            <FiltersContainer ref={refFiltersContainer} style={{ height: `${!showFilters ? '0' : height}` }}>
                <FiltersButton disabled={currentFilter === 'all'} onClick={() => dispatch(setFilter('all'))}>
                    Все
                </FiltersButton>
                <FiltersButton disabled={currentFilter === 'completed'} onClick={() => dispatch(setFilter('completed'))}>
                    Выполненные
                </FiltersButton>
                <FiltersButton disabled={currentFilter === 'uncompleted'} onClick={() => dispatch(setFilter('uncompleted'))}>
                    Невыполненные
                </FiltersButton>
            </FiltersContainer>
        </Container>
    );
};
export default TodoFilter;

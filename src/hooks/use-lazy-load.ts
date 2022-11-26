import { useEffect, useReducer, useCallback } from 'react';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'set-data': {
      return {
        ...state,
        data: [...state.data, ...action.payload],
        currentPage: state.currentPage + 1,
        currentPosition: state.currentPosition + state.perPage,
        hasMore: state.currentPosition < state.total,
      };
    }
    default:
      return state;
  }
};

const useLazyLoad = ({ triggerRef, setData, options, perPage, total }: any) => {
  const [state, dispatch] = useReducer(reducer, {
    total,
    currentPage: 1,
    currentPosition: 0,
    perPage,
    hasMore: perPage < total,
    data: [],
  });

  const onIntersect = useCallback(
    (entries: any) => {
      const entry = entries[0];

      const boundingRect = entry.boundingClientRect;
      const intersectionRect = entry.intersectionRect;

      if (
        entry.isIntersecting &&
        intersectionRect.bottom - boundingRect.bottom <= 0
      ) {
        const payload = setData(state.currentPosition);
        dispatch({ type: 'set-data', payload });
      }
    },
    [setData, state.currentPosition]
  );

  useEffect(() => {
    const container = triggerRef.current;

    if (container) {
      const observer = new IntersectionObserver(onIntersect, {
        rootMargin: '10%',
      });

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  return state;
};

export default useLazyLoad;

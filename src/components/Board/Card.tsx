import React from 'react';
import type { ITask, ISubTask } from '../../data/type';

interface CardProps {
  cardData: ITask;
}

const Card = (props: CardProps) => {
  const { cardData } = props;
  const countCompleted = cardData.subtasks?.filter((item) => item.isCompleted === true);

  return (
    <div className='Card' tabIndex={0}>
      <div className='Card__title'>{cardData.title}</div>
      <div className='Card__count'>
        {countCompleted?.length} of {cardData.subtasks?.length} subtasks
      </div>
    </div>
  );
};

export default Card;

import { ChangeEvent, FormEvent, useState } from 'react';
import { IModal, ISubTask } from '../../data/type';
import Modal from '../../standard/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { editTask } from '../../reducer/dataSlice';
import { Cross } from '../../data/icons';
import Button from '../../standard/Button';
import SelectDropDown from '../../standard/SelectDropDown';

const EditTask = (props: IModal) => {
  const { ModalDetail } = props;
  const dispatch = useAppDispatch();
  const status = ['todo', 'doing', 'done'];
  const boardTab = useAppSelector((state) => state.boardTab);
  const [newTask, setNewTask] = useState({
    title: ModalDetail.title,
    description: ModalDetail.description,
    subtasks: ModalDetail.subtasks.map((item: ISubTask) => ({ title: item.title, isCompleted: item.isCompleted })),
    status: ModalDetail.status,
  });
  const onSetCurrentStatus = (value: string) => {
    setNewTask({ ...newTask, status: value });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      // alert('TODO - add form validation');
      return;
    }
    dispatch(editTask({ currentBoard: boardTab, newTask: newTask, oldTask: ModalDetail }));
  };

  const handleAddNewSubTask = () => {
    const subTask = newTask.subtasks.slice();
    subTask.push('');
    setNewTask({ ...newTask, subtasks: subTask });
  };

  const handleDeleteSubTask = (index: number) => {
    if (newTask.subtasks.length > 1) {
      newTask.subtasks.splice(index, 1);
    }
    setNewTask({ ...newTask, subtasks: newTask.subtasks });
  };

  const onSubtasksChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subTask = newTask.subtasks.slice();
    subTask[index].title = e.target.value;
    setNewTask({ ...newTask, subtasks: subTask });
  };

  return (
    <Modal>
      <form className='AddNewTask' onSubmit={handleFormSubmit}>
        <div className='AddNewTask__topWrapper'>
          <h2>Edit Task</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Title</p>
          <input type='text' value={newTask.title} name='title' onChange={handleInputChange} />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Description</p>
          <textarea
            className='AddNewTask__description'
            value={newTask.description}
            rows={4}
            name='description'
            onChange={handleInputChange}
          />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Subtasks</p>
          <ul className='AddNewTask__subtaskUl'>
            {newTask.subtasks.map((item: ISubTask, index: number) => {
              return (
                <li className='AddNewTask__subtaskLi' key={index}>
                  <input
                    className='AddNewTask__subtask__input'
                    type='text'
                    value={newTask.subtasks[index].title}
                    onChange={(e) => onSubtasksChange(e, index)}
                  />
                  <button className='' onClick={() => handleDeleteSubTask(index)}>
                    <Cross />
                  </button>
                </li>
              );
            })}
          </ul>
          <Button small colorTheme onClick={handleAddNewSubTask} style={{ marginTop: '0.5rem' }}>
            + Add New Subtask
          </Button>
        </div>
        <div className='AddNewTask__boxWrapper AddNewTask__status'>
          <p className='AddNewTask__sub-title'>Status</p>
          <SelectDropDown status={status} currentStatus={newTask.status} onSetCurrentStatus={onSetCurrentStatus} />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <Button small type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTask;

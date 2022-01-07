import {useState} from 'react';
const AddTask = ({onAdd} ) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);
  const onSubmit = (e)=>{
    e.preventDefault();
    if(!text){
      alert('Please enter text');
      return;
    }

    onAdd({text , day , reminder});
    setText('');
    setDay('');
    setReminder(false);
  }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
              <label>Task</label>
              <input className='form-control' value={text} onChange={(e)=> setText(e.target.value)} type='text' placeholder='Enter Title' />
            </div>
            <div className='form-control'>
              <label>Day & Time</label>
              <input className='form-control' value={day} onChange={(e)=> setDay(e.target.value)}  type='text' placeholder='Enter day and time' />
            </div>
            <div className='form-control form-control-check'>
              <label>Set Reminder</label>
              <input type='checkbox' value={reminder} checked={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}  />
            </div>
            <input type="submit" name="Add Task" value="Save Task" className="btn btn-block"/>
        </form>
    )
}

export default AddTask

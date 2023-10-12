import { useState } from 'react'

type Prop = {
	todoSummary: string,
	owner: string
}

export const AddChildForm = (prop: Prop) => {
	const [todo, setTodo] = useState<Prop>(prop);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		fetch('http://127.0.0.1:8000/todo/add', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				// mode: 'no-cors',
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// todo
				'summary': prop.todoSummary,
				'owner': prop.owner
			})
		})
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.log(err))
	}

	return (
		//<form ref="form">
			<div>
				<input type="text" name="todo[summary]" onChange={e => setTodo({...todo, todoSummary: e.target.value})} value={prop.todoSummary} />
				<input type="text" name="todo[owner]" onChange={e => setTodo({...todo, owner: e.target.value})} value={prop.owner} />
				{/* <select name="todo[done]" value={prop.done} onChange={e => setTodo({...todo, done: e.target.value})}>
						<option value={prop.done}>True</option>
						<option value={prop.done}>False</option>
				</select> */}
				<button onClick={handleClick}>送信</button>
			</div>
		//</form>
	);
}
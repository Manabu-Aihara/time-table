import { useState } from 'react'

export type Prop = {
	// id: number,
	summary: string,
	owner: string,
	done: boolean
}

export const AddChildForm = () => {
	const [todo, setTodo] = useState<Prop>({
		summary: '', owner: '', done: false
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// name, valueという変数名で決まっているようだ
		const {name, value} = e.target;
		setTodo({...todo, [name]:value});
	}

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		fetch('http://127.0.0.1:8000/todo/add', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				// mode: 'no-cors',
				// Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// todo
				summary: todo.summary,
				owner: todo.owner
			})
		})
		.then(res => res.json());
		// .then(json => console.log(json))
		// .catch(err => console.log(err));
	}

	return (
		//<form ref="form">
			<div>
				さまりー：
				<input type="text" name="summary" onChange={handleChange} value={todo.summary} />
				おーなー：
				<input type="text" name="owner" onChange={handleChange} value={todo.owner} />
				{/* <select name="todo[done]" value={prop.done} onChange={e => setTodo({...todo, done: e.target.value})}>
						<option value={prop.done}>True</option>
						<option value={prop.done}>False</option>
				</select> */}
				<button onClick={handleClick}>送信</button>
			</div>
		//</form>
	);
}
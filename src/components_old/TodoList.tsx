import{ useEffect, useState } from "react";

import { Prop } from "./InputComponent"
// export type Prop = {
// 	"summary": string,
// 	"owner": string
// }

const fetchData: Promise<Prop[]> = fetch('http://127.0.0.1:8000/todo/all',
	{
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			mode: 'cors',
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// credentials: 'include' // ここを追加。
		}
	})
	// .then(res => console.log(res))
	.then(res => res.json());
	// .catch(err => console.log(err));

export const AllTodo = () => {
	const [todos, setTodos] = useState<Prop[]>([])

	useEffect(() => {
    const f = async () => {
			const json = await fetchData;
			console.log(json);
			setTodos(json);
    };
    f();
	}, []);
	console.log(todos);

	return (
		<>
			<h3>Hello Json</h3>
			{todos.map((prop: Prop) => {
				return (
					<>
						<ul>
							{/* <li>ID: {prop.id}</li> */}
							<li>Summary: {prop.summary}</li>
							<li>Owner: {prop.owner}</li>
							<li>Done: {prop.done.toString()}</li>
							{/* <a href={"http://127.0.0.1:8000/todo/all" + prop.id}>削除</a> */}
						</ul>
					</> )
			})}
		</>
    )
}

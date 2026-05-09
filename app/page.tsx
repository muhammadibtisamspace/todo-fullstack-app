import prisma from "@/lib/prisma";
import formAction, { deleteTodo, completeTodo } from "./formAction";
export default async function Home() {
  const allTodos = await prisma.todo.findMany();
  return (
    <main>
      <form action={formAction}>
        <div className="flex flex-row items-center justify-center ">
          <input
            type="text"
            name="todo"
            placeholder="Todo Handler"
            className="border-white border-rounded-full border-2"
          />
          <button type="submit">Add Todo</button>
        </div>
      </form>

      <section>
        <div>
          <ul>
            {allTodos.map((todo) => (
              <li key={todo.id} className='flex flex-row gap-8'>
                {todo.title}
                {/* Complete Todo Button */}
                <form action={completeTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button type="submit">Complete</button>
                </form>

                {/* Delete Todo Button */}
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <input type="hidden" name="status" value={todo.status} />
                  <button type="submit">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

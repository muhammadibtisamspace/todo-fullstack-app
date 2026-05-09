'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
export default async function formAction(formData: FormData) {
  const todo = formData.get("todo") 
  const addTodo = await prisma.todo.create({
    data: {
      title: todo,
    },
  });
  

  revalidatePath("/"); // 👈 THIS is the key
}


export async function deleteTodo(formData: FormData) {
  const id = formData.get("id");
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/"); // 👈 THIS is the key
}

export async function completeTodo(formData: FormData){
  const progress = formData.get('status')
    const id = formData.get("id");
  
  await prisma.todo.update({
    where : {
      id,
    },
    data : {
      status: "COMPLETED"
    }
  })
  revalidatePath('/')
};

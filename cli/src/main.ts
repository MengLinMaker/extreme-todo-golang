import { consola } from "consola"
import { db } from './database/db'
import { insertDummyTodo, insertDummyTodoTag, insertDummyUser } from './database/insert'

const timeFunction = async (fn: () => void) => {
  const startMillis = performance.now()
  await fn()
  return performance.now() - startMillis
}

const loop = async (num: number, fn: () => void) => {
  const funcArray: ReturnType<typeof fn>[] = []
  for (let i = 0; i < num; i++) funcArray.push(fn())
  await Promise.all(funcArray)
}

const main = async () => {
  consola.box('Populate demo todo database!')

  const mockUserCount = Number(await consola.prompt("# of mock Users", { placeholder: '100', default: '100' }))
  const mockTodoCountPerUser = Number(await consola.prompt("# of mock Todo", { placeholder: '100', default: '100' }))
  const mockTagCountPerTodo = Number(await consola.prompt("# of mock Todo_Tag", { placeholder: '1', default: '1' }))
  
  const insertCount = mockUserCount * (1 + mockTodoCountPerUser * (1 + mockTagCountPerTodo))
  consola.start(`Inserting ${insertCount} columns into database`)

  const elapsedTime = await timeFunction(async () => {
    await loop(mockUserCount, async () => {
      const user_id = await insertDummyUser(db)
      await loop(mockTodoCountPerUser, async () => {
        const todo_id = await insertDummyTodo(db, user_id)
        await loop(mockTagCountPerTodo, async () => {
          const todo_tag_id = await insertDummyTodoTag(db, todo_id)
        })
      })
    })
  })
  consola.success("Database population complete!")

  consola.info('Database insert results:')
  console.table({
    '# of Inserts': insertCount,
    'Elapsed time (ms)': elapsedTime.toFixed(3),
    'QPS': (insertCount * 1000 / elapsedTime).toFixed(3)
  })
  process.exit()
}

main()

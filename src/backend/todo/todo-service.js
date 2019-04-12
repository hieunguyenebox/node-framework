import TodoModel from './todo-model'

export const create = () => {

    TodoModel.create({
        content: 'test',
    })
}
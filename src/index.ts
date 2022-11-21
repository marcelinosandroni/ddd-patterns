import { randomUUID } from 'crypto'
import express, { Router } from 'express'
import { EntityError } from './entity.error'
import { Name } from './name.value-object'
import {User} from './user'
import { UserResponseDto } from './user-response.dto'
import { UserFactory } from './user.factory'
import { ValidationError } from './validation.error'
import { ValueObjectError } from './value-object.error'

console.log('Started!')
const app = express()
const port = 4000

app.use(express.json())

console.log(`App started on port ${port}`)

const route = Router()

const users: User[] = []

const hasUserWithName = (name: string): boolean => {
  return !!users.find(user => user.name.value === name)
}
const hasUserWithEmail = (email: string): boolean => {
  return !!users.find(user => user.email.value === email)
}

route.post('/users', (request, response) => {
  const {name, age, email, password} = request.body
  if (hasUserWithName(name)) {
    return response.status(400).send({name: 'User with this name already exist'})
  }
  if (hasUserWithEmail(email)) {
    return response.status(400).send({email: 'User with this email already exist'})
  }
  try {
    const user = UserFactory.create(name, age, email, password)
    users.push(user)
    const userResponseDto = new UserResponseDto(user)
    response.status(201).send(userResponseDto)
  } catch (error) {
    if (error instanceof EntityError || error instanceof ValueObjectError || error instanceof ValidationError) {
      return response.status(400).send({message: error.message})
    }
    console.error({error})
    response.sendStatus(500)
  }
})


route.get('/users', (request, response) => {
  if (!users.length) {
    return response.status(204).send()
  }
  const usersResponse = users.map(user => new UserResponseDto(user))
  response.send(usersResponse)
})

app.use(route)
app.listen(port)


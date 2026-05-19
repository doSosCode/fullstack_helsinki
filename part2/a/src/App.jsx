const Header = (header) => {
  return (
    <div>
      <h2>{header.header}</h2>
    </div>
  )
}

const Part = (part) => {
  return (
      <li>{part.part} {part.exercises}</li>
  )
}

const Content = ({content}) => {
  return (
    <div>
        {content.map(contentPart =>
          <Part key={contentPart.id} part={contentPart.name} exercises={contentPart.exercises}/>
        )}
    </div>
  )
}

const Total = ({exercises}) => {
  const totalExercises = exercises.reduce((accumulator, part) =>
    (accumulator += part.exercises),0)
  return (
      <div>
        <h4>total of {totalExercises} exercises</h4>
      </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}     


const App = ({course}) => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4  
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App
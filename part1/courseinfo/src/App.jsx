const Header = (course) => {
  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Part = (part) => {
  return(
      <div>
        <p>{part.part}</p>
        <p>Exercises: {part.exercises}</p>
      </div>    
  )
}

const Content = (content) => {
  return(
      <div>
        <Part part={content.parts[0].name} exercises={content.parts[0].exercises}/>
        <Part part={content.parts[1].name} exercises={content.parts[1].exercises}/>
        <Part part={content.parts[2].name} exercises={content.parts[2].exercises}/>
      </div>
  )
}

const Total = (exercises) => {
  return(
      <div>
        <h4>Total of exercises: {exercises.parts[0].exercises + exercises.parts[1].exercises + exercises.parts[2].exercises}</h4>
      </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          {part.description}
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          submit to {" "}
          <a href={part.exerciseSubmissionLink}>
            {part.exerciseSubmissionLink}
          </a>
        </p>
      );
    case 'special':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          {part.description}
          <br/>
          required skills: {" "}
          <span>{part.requirements.join(', ')}</span> 
        </p>
      );
    default:
      return assertNever(part);      
  }
}

export default Part
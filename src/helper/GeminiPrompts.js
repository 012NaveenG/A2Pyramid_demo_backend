// Modify the SUBJECT_PROMPTS object to include prompts for all subjects
const SUBJECT_PROMPTS = {
  // Science Subjects
  physics: `Generate a class {className} Physics question paper focusing on age-appropriate topics.
Include questions that test:
- Basic concepts and definitions
- Understanding of physical phenomena
- Simple numerical problems (if applicable)
- Real-world applications
Questions should match {className} grade difficulty level.`,

  chemistry: `Generate a class {className} Chemistry question paper covering:
- Chemical reactions and equations
- Basic atomic structure
- Elements and compounds
- Chemical bonding (for higher classes)
- Practical applications
Questions should be age-appropriate for {className} grade.`,

  biology: `Generate a class {className} Biology question paper including:
- Living organisms and their systems
- Basic biological processes
- Environmental awareness
- Human anatomy (age-appropriate)
- Plant and animal life
Match difficulty to {className} grade level.`,

  science: `Generate a class {className} General Science paper covering:
- Basic scientific concepts
- Natural phenomena
- Simple experiments and observations
- Environmental awareness
- Daily life applications
Suitable for {className} grade understanding.`,

  // Mathematics
  maths: `Generate a class {className} Mathematics question paper covering:
- Age-appropriate mathematical concepts
- Problem solving skills
- Basic calculations
- Logical reasoning
- Real-life applications
Questions should be suitable for {className} grade students.`,

  // Languages
  english: `Generate a class {className} English question paper including:
- Reading comprehension (age-appropriate)
- Grammar exercises
- Vocabulary
- Creative writing (if applicable)
- Literature (for higher classes)
Questions should match {className} grade level.`,

  languages: `Generate a class {className} Language paper including:
- Reading comprehension
- Grammar and syntax
- Vocabulary building
- Writing skills
- Literature appreciation
Appropriate for {className} grade level.`,

  // Social Studies
  social: `Generate a class {className} Social Studies paper covering:
- History (age-appropriate events)
- Geography concepts
- Civics and citizenship
- Current affairs (where applicable)
- Cultural awareness
Match {className} grade curriculum standards.`,

  // Environmental Studies
  evs: `Generate a class {className} Environmental Studies paper including:
- Our environment and ecosystem
- Plants and animals
- Family and society
- Food and nutrition
- Basic science concepts
Suitable for young learners in class {className}.`,

  // Computer Science
  computer: `Generate a class {className} Computer Science paper covering:
- Basic computer concepts
- Programming fundamentals (for higher classes)
- Digital literacy
- Internet and safety
- Practical applications
Match difficulty to {className} grade level.`,
};


export{SUBJECT_PROMPTS}
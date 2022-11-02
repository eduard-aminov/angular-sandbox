enum Patterns {
  Or = '|',
  InclusiveRange = '=..=',
  NotInclusiveRange = '..',
  HighInclusiveRange = '..=',
  LowInclusiveRange = '=..',
  Default = '_',
}

export const match = (condition: string) => {
  return (branches: { [key: string]: any }) => {
    for (const branchKey of Object.keys(branches)) {
      const simpleDirectMatch = branches[condition];

      if (simpleDirectMatch) {
        return getValueOrCallFunction(simpleDirectMatch);
      } else if (branchKey.includes(Patterns.Or)) {
        return handleOrPattern(branches, branchKey, condition);
      } else if (branchKey.includes(Patterns.HighInclusiveRange)) {
        return handleHighInclusiveRangePattern(branches, branchKey, condition);
      } else if (branchKey.includes(Patterns.LowInclusiveRange)) {
        return handleLowInclusiveRangePattern(branches, branchKey, condition);
      } else if (branchKey.includes(Patterns.NotInclusiveRange)) {
        return handleNotInclusiveRangePattern(branches, branchKey, condition);
      } else if (branches[Patterns.Default]) {
        return branches[Patterns.Default];
      }
    }
  };
};

function handleOrPattern(branches: { [key: string]: any }, branchKey: string, condition: string): any {
  const branchVariants = branchKey.split('|').map((i: string) => i.trim());
  if (branchVariants.includes(condition)) {
    const branchValue = branches[branchKey];
    return getValueOrCallFunction(branchValue);
  }
}

function handleHighInclusiveRangePattern(branches: { [key: string]: any }, branchKey: string, condition: string): any {
  const [leftOperand, rightOperand] = branchKey.split('..=');
  if (+leftOperand >= +condition && +condition < +rightOperand) {
    const branchValue = branches[branchKey];
    return getValueOrCallFunction(branchValue);
  }
}

function handleLowInclusiveRangePattern(branches: { [key: string]: any }, branchKey: string, condition: string): any {
  const [leftOperand, rightOperand] = branchKey.split('=..');
  if (+leftOperand >= +condition && +condition < +rightOperand) {
    const branchValue = branches[branchKey];
    return getValueOrCallFunction(branchValue);
  }
}

function handleNotInclusiveRangePattern(branches: { [key: string]: any }, branchKey: string, condition: string): any {
  const [leftOperand, rightOperand] = branchKey.split('..');
  if (+leftOperand > +condition && +condition <= +rightOperand) {
    const branchValue = branches[branchKey];
    return getValueOrCallFunction(branchValue);
  }
}

function getValueOrCallFunction(value: (() => any) | any): any {
  return typeof value === 'function' ? value() : value;
}

//
// const doSomething1 = () => 'someResult1';
// const doSomething2 = () => 'someResult2';
// const doSomething3 = () => 'someResult3';
// const doDefault = () => 'defaultResult';

// const result = match(2)({
//   1: () => 'one',
//   2: () => match(66)({
//     55: () => '55',
//     [55 + 11]: () => '66',
//     77: () => '77',
//   }),
//   3: () => 'three',
//   _: () => 'default',
// });
//
// console.log(result); // 66
//
// const fnResult = match('someKey2')({
//   someKey1: doSomething1,
//   someKey2: doSomething2,
//   someKey3: doSomething3,
//   _: doDefault,
// });

// console.log(fnResult); // someResult2

// const result2 = match('5')({
//   '1': () => 'one',
//   '2 | 3 | 5 | 7 | 11': () => 'This is a prime',
//   '13..19': () => 'teen',
// });
//
// console.log(result2);

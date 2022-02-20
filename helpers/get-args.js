export function getArgs(argv) {
  const [executer, file, ...args] = argv;

  const result = { executer, file, h: false, t: undefined, c: undefined };

  const argsLength = args.length;
  args.forEach((arg, index, array) => {
    const nextValue = index + 1 < argsLength ? array[index + 1] : undefined;

    if (arg.charAt(0) === '-') {

      result[arg.substring(1)] = (nextValue && nextValue.charAt(0) !== '-') ? nextValue : true;
    }
  });

  return result;
}

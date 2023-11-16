type IIncorrectSelectionDisplayProps = {
  incorrect: {
    [key: string]: boolean;
  };
};

export default function IncorrectSelectionDisplay({
  incorrect,
}: IIncorrectSelectionDisplayProps) {
  return (
    <div className="w-1/2">
      <h1>Used Letters</h1>
      <div className="flex gap-4 w-full min-h-[4rem] bg-slate-200 justify-center items-center p-4 rounded">
        {Object.keys(incorrect).map((letter) => (
          <div key={letter} className="p-2 bg-white rounded h-fit">
            <p>{letter}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type ILettersProps = {
  word: string;
};

export default function Letters({ word }: ILettersProps) {
  return (
    <div>
      <input value={word} />
    </div>
  );
}

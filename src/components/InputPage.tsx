import SubmitButton from "./SubmitButton";
import SelectWeekdays from "./SelectWeekdays";
import SelectExperience from "./SelectExperience";
import SelectStyle from "./SelectStyle";
import SelectSets from "./SelectSets";
import SelectGroups from "./SelectGroups";
import SelectBias from "./SelectBias";

interface Props {
  setInputData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: () => void;
}

const InputPage = ({ setInputData, handleSubmit }: Props) => {
  return (
    <>
      <SelectWeekdays></SelectWeekdays>
      <SelectExperience></SelectExperience>
      <SelectStyle></SelectStyle>
      <SelectSets></SelectSets>
      <SelectGroups type={1}></SelectGroups>
      <SelectGroups type={2}></SelectGroups>
      <SelectBias></SelectBias>
      <SubmitButton handleSubmit={handleSubmit}></SubmitButton>
    </>
  );
};

export default InputPage;

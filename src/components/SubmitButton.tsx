interface Props {
  handleSubmit: () => void;
}

const SubmitButton = ({ handleSubmit }: Props) => {
  return (
    <button onClick={handleSubmit} className="submit-button">
      Submit
    </button>
  );
};

export default SubmitButton;

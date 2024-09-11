interface InputFieldProps {
    label: string;
    type: string;
    setState: React.Dispatch<React.SetStateAction<string>>
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, type, setState }) => {
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <input
          type={type}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
          onChange={(e)=>{
            setState(e.target.value)
          }}
        />
      </div>
    );
  };
  
  export default InputField;
  
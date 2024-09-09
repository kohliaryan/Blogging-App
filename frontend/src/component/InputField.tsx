interface InputFieldProps {
    label: string;
    type: string;
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, type }) => {
    return (
      <div>
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <input
          type={type}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />
      </div>
    );
  };
  
  export default InputField;
  
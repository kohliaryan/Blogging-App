interface ButtonProps {
    text: string,
  }
  
  const Button: React.FC<ButtonProps> = ({ text }) => {
    return (
      <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200" onClick={()=> console.log(name)}>
        {text}
      </button>
    );
  };
  
  export default Button;
  
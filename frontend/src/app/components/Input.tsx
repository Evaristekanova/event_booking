interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  isRequired?: boolean;
  error?: string; // new prop for error message
}

function Input({
  type,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  label,
  name,
  isRequired,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-1 ${
          error ? "border-red-1" : "border-gray-300"
        } ${className}`}
        disabled={disabled}
      />
      {isRequired && error && (
        <p className="text-red-1 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default Input;

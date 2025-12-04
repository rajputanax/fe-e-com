import React from "react";

const FormRow = React.forwardRef(function FormRow(
  { type, labelText, placeholder, name, icon ,click , ...rest },
  ref
) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {labelText}
      </label>
      <div className="relative">

      <input
        type={type}
        id={name}
        autoComplete="off"
        name={name}
        placeholder={placeholder}
        ref={ref}           // ✅ Forward the ref to connect RHF
        {...rest}           // ✅ Spread all RHF handlers (onChange, onBlur, etc.)
        className="w-full rounded-md border border-gray-300 px-3 py-2 
                   focus:border-blue-500 focus:outline-none focus:ring-1 
                   focus:ring-blue-500 transition"
      />
      <div className='absolute top-4 right-4' onClick={click}>   {icon}</div>
      </div>
      
   
    </div>
  );
});

export default FormRow;

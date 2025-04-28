const TextInput = ({label, name, type, rows, id, onChange}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-stone-200"
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={id}
          rows={rows}
          onChange={onChange}
          className="w-full rounded-md border border-stone-300 px-3 py-2 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        ></textarea>
      ) : (
        <input
          name={name}
          id={id}
          type={type}
          onChange={onChange}
          className="w-full rounded-md border border-stone-300 px-3 py-2 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        />
      )}
    </div>
  );
};
export default TextInput;

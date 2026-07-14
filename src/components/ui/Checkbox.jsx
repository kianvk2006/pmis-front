export default function Checkbox(props) {
  return (
    <input
      type="checkbox"
      className="
        h-5
        w-5
        accent-orange-500
      "
      {...props}
    />
  );
}
export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={` grid place-content-center ${
        className ? className : "h-screen w-full"
      }`}
    >
      <div className="loader" />
    </div>
  );
}

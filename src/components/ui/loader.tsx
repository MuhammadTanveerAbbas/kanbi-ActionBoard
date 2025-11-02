export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div
          className="w-16 h-16 border-4 border-primary/40 border-r-transparent rounded-full animate-spin absolute top-2 left-2"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        ></div>
      </div>
      <div className="mt-6 text-center">
        <h2
          className="text-2xl font-bold font-headline glitch-effect"
          data-text="KANBI"
        >
          KANBI
        </h2>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto pt-24 pb-8 flex flex-col gap-8">
      <div className="w-full min-h-100 bg-muted/30 rounded-[8px] border border-border relative">
        <div className="absolute top-0 left-0 border-l-2 border-t-2 w-10 h-10 rounded-tl-[8px] border-foreground/80" />
        <div className="absolute top-0 right-0 border-r-2 border-t-2 w-10 h-10 rounded-tr-[8px] border-foreground/80" />
        <div className="absolute bottom-0 left-0 border-l-2 border-b-2 w-10 h-10 rounded-bl-[8px] border-foreground/80" />
        <div className="absolute bottom-0 right-0 border-r-2 border-b-2 w-10 h-10 rounded-br-[8px] border-foreground/80" />
        <div className="Relative w-full h-full p-4 flex flex-col justify-between gap-20">
          <div className="w-full h-14 section-stripes" />
          <h1 className="text-7xl font-bold text-center mb-4">Welcome to My Portfolio</h1>
          <div className="w-full h-14 section-stripes" />
        </div>
      </div>
    </div>
  );
}

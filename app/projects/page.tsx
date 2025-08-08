import CornerFrame from "@/components/corner-frame";

export default function BlogList() {
  return (
    <>
      <div className="w-full h-50 bg-gradient-to-b from-foreground/10 to-transparent absolute -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-22 pt-30 pb-20">
        <CornerFrame>
          <div className="flex flex-col gap-20">
            <div className="w-full h-8 section-stripes" />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-4xl font-bold text-center text-foreground mb-4">
                Heads up! This site is still a work in progress.
              </h2>
              <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
                I&apos;m building out a new and improved version of my portfolio
                right now. Feel free to poke around and see what&apos;s here,
                but expect some changes and new stuff coming soon!
              </p>
            </div>
            <div className="w-full h-8 section-stripes" />
          </div>
        </CornerFrame>
      </div>
    </>
  );
}

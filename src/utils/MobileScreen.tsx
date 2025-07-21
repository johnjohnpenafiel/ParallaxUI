export const MobileScreen = () => {
  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col items-center justify-center z-50">
      <div className="flex items-center justify-center mb-4">
        <div className="w-8 h-8 mr-2 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground text-lg font-bold">P</span>
        </div>
        <h1 className="text-4xl font-medium tracking-wide">Parallax</h1>
      </div>
      <p className="text-center text-muted-foreground">
        Currently only available for desktop view.
      </p>
    </div>
  );
};

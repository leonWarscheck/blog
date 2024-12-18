export default function ResponsiveNote() {
  return (
    <div
      id="desktop-only-note"
      className="absolute left-1/2 top-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 transform flex-col bg-neutral-700 px-4 py-60 text-center text-neutral-400 sm:hidden"
    >
      <h3 className="text-xl font-bold">SymbolTrainer is Desktop Only</h3>{' '}
      <br />
      <p className="mx-auto max-w-xl">
        If you practice on a smartphone with a bluetooth keyboard, just go
        horizontal.
      </p>
    </div>
  );
}

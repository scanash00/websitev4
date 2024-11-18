'use client';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0">
        {/* Vertical gradient with subtle violet tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/[0.02] to-black" />
        {/* Wider, softer radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_70%)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(75, 75, 75) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(75, 75, 75) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    </div>
  );
}

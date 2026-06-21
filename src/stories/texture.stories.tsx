import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, CardHeader, CardTitle, Navbar } from "@/index";

type TextureDemoProps = {
  background: string;
  noiseOpacity: number;
  grungeOpacity: number;
  grainSize: number;
  displacement: number;
  noiseContrast: number;
  blendMode: CSSProperties["mixBlendMode"];
};

function textureStyle({ background, noiseOpacity, grungeOpacity, grainSize, displacement, noiseContrast, blendMode }: TextureDemoProps) {
  return {
    "--aottg2-texture-bg": background,
    "--aottg2-texture-noise-opacity": String(noiseOpacity),
    "--aottg2-texture-grunge-opacity": String(grungeOpacity),
    "--aottg2-texture-size": `${grainSize}px`,
    "--aottg2-texture-displacement": `${displacement}px`,
    "--aottg2-texture-noise-contrast": `${noiseContrast}%`,
    "--aottg2-texture-blend": blendMode,
  } as CSSProperties;
}

function TextureDemo(args: TextureDemoProps) {
  const style = textureStyle(args);

  return (
    <div className="min-h-screen space-y-6 bg-background p-8 text-foreground">
      <div>
        <h1 className="font-primary text-4xl uppercase text-primary">Texture Utility</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Reusable CSS grunge/noise texture. Tune controls, then copy the CSS variable values as defaults if the grain/displacement feels right.
        </p>
      </div>

      <div className="aottg2-texture h-40 border p-6 shadow-lg" style={style}>
        <div className="font-primary text-3xl uppercase">Any background color</div>
        <p className="max-w-lg text-sm">Uses CSS variables + SVG turbulence grain/displacement. No bundled texture image.</p>
      </div>

      <Navbar logo="text" logoText="workshop" className="border" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="aottg2-texture" style={{ ...style, "--aottg2-texture-bg": "hsl(var(--card))" } as CSSProperties}>
          <CardHeader>
            <CardTitle>Card</CardTitle>
          </CardHeader>
          <CardContent>Same utility works on card surfaces.</CardContent>
        </Card>
        <div className="aottg2-texture flex min-h-32 items-center justify-center border p-4" style={{ ...style, "--aottg2-texture-bg": "hsl(var(--primary))" } as CSSProperties}>
          <Button variant="secondary">Primary texture</Button>
        </div>
        <div className="aottg2-texture flex min-h-32 items-center justify-center border p-4" style={{ ...style, "--aottg2-texture-bg": "#111827" } as CSSProperties}>
          <div className="font-primary text-2xl uppercase text-white">Dark color</div>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Utilities/Texture",
  component: TextureDemo,
  parameters: { layout: "fullscreen" },
  argTypes: {
    background: { control: "color" },
    noiseOpacity: { control: { type: "range", min: 0, max: 0.8, step: 0.01 } },
    grungeOpacity: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    grainSize: { control: { type: "range", min: 40, max: 240, step: 4 } },
    displacement: { control: { type: "range", min: 0, max: 80, step: 1 } },
    noiseContrast: { control: { type: "range", min: 100, max: 400, step: 10 } },
    blendMode: {
      control: "select",
      options: ["normal", "multiply", "screen", "overlay", "soft-light", "hard-light", "color-burn"],
    },
  },
  args: {
    background: "hsl(0 0% 96%)",
    noiseOpacity: 0.34,
    grungeOpacity: 0.58,
    grainSize: 92,
    displacement: 22,
    noiseContrast: 230,
    blendMode: "overlay",
  },
} satisfies Meta<typeof TextureDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Dark: Story = {
  args: {
    background: "hsl(0 0% 7%)",
    noiseOpacity: 0.4,
    grungeOpacity: 0.62,
    grainSize: 84,
    displacement: 28,
    noiseContrast: 260,
    blendMode: "overlay",
  },
};

export const PaletteColors: Story = {
  args: {
    background: "hsl(196 78% 61%)",
    noiseOpacity: 0.28,
    grungeOpacity: 0.48,
    grainSize: 88,
    displacement: 18,
    noiseContrast: 220,
    blendMode: "overlay",
  },
};

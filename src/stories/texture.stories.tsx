import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, CardHeader, CardTitle, Navbar } from "@/index";

type TextureDemoProps = {
  background: string;
  noiseOpacity: number;
  grungeOpacity: number;
  grainSize: number;
  blendMode: CSSProperties["mixBlendMode"];
};

function textureStyle({ background, noiseOpacity, grungeOpacity, grainSize, blendMode }: TextureDemoProps) {
  return {
    "--aottg2-texture-bg": background,
    "--aottg2-texture-noise-opacity": String(noiseOpacity),
    "--aottg2-texture-grunge-opacity": String(grungeOpacity),
    "--aottg2-texture-size": `${grainSize}px`,
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
          Reusable CSS grunge/noise texture. Tune controls, then copy the CSS variable values as defaults if the texture feels right.
        </p>
      </div>

      <div className="aottg2-texture h-40 border p-6 shadow-lg" style={style}>
        <div className="font-primary text-3xl uppercase">Any background color</div>
        <p className="max-w-lg text-sm">Uses CSS variables + SVG turbulence noise. No bundled texture image.</p>
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
    noiseOpacity: { control: { type: "range", min: 0, max: 0.7, step: 0.01 } },
    grungeOpacity: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    grainSize: { control: { type: "range", min: 60, max: 360, step: 10 } },
    blendMode: {
      control: "select",
      options: ["normal", "multiply", "screen", "overlay", "soft-light", "hard-light", "color-burn"],
    },
  },
  args: {
    background: "hsl(0 0% 96%)",
    noiseOpacity: 0.18,
    grungeOpacity: 0.42,
    grainSize: 180,
    blendMode: "overlay",
  },
} satisfies Meta<typeof TextureDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Dark: Story = {
  args: {
    background: "hsl(0 0% 7%)",
    noiseOpacity: 0.22,
    grungeOpacity: 0.48,
    grainSize: 180,
    blendMode: "overlay",
  },
};

export const PaletteColors: Story = {
  args: {
    background: "hsl(196 78% 61%)",
    noiseOpacity: 0.16,
    grungeOpacity: 0.35,
    grainSize: 160,
    blendMode: "overlay",
  },
};

import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Button, Card, CardContent, CardHeader, CardTitle, Navbar } from "@/index";

type TextureDemoProps = {
  background: string;
  noiseOpacity: number;
  noiseSize: number;
  noiseContrast: number;
  grungeOpacity: number;
  grungeSize: number;
  grungeContrast: number;
  grungeBrightness: number;
  blendMode: CSSProperties["mixBlendMode"];
};

type TextureDemoViewProps = TextureDemoProps & {
  onChange?: (patch: Partial<TextureDemoProps>) => void;
};

const blendModes = ["normal", "multiply", "screen", "overlay", "soft-light", "hard-light", "color-burn"] as const;

function textureStyle({ background, noiseOpacity, noiseSize, noiseContrast, grungeOpacity, grungeSize, grungeContrast, grungeBrightness, blendMode }: TextureDemoProps) {
  return {
    "--aottg2-texture-bg": background,
    "--aottg2-texture-noise-opacity": String(noiseOpacity),
    "--aottg2-texture-noise-size": `${noiseSize}px`,
    "--aottg2-texture-noise-contrast": `${noiseContrast}%`,
    "--aottg2-texture-grunge-opacity": String(grungeOpacity),
    "--aottg2-texture-grunge-size": `${grungeSize}px`,
    "--aottg2-texture-grunge-contrast": `${grungeContrast}%`,
    "--aottg2-texture-grunge-brightness": `${grungeBrightness}%`,
    "--aottg2-texture-blend": blendMode,
  } as CSSProperties;
}

function cssValues(args: TextureDemoProps) {
  return `--aottg2-texture-bg: ${args.background};\n--aottg2-texture-noise-opacity: ${args.noiseOpacity};\n--aottg2-texture-noise-size: ${args.noiseSize}px;\n--aottg2-texture-noise-contrast: ${args.noiseContrast}%;\n--aottg2-texture-grunge-opacity: ${args.grungeOpacity};\n--aottg2-texture-grunge-size: ${args.grungeSize}px;\n--aottg2-texture-grunge-contrast: ${args.grungeContrast}%;\n--aottg2-texture-grunge-brightness: ${args.grungeBrightness}%;\n--aottg2-texture-blend: ${args.blendMode};`;
}

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-1 text-xs uppercase text-muted-foreground">
      <span className="flex justify-between gap-4"><span>{label}</span><span>{value}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function TextureControls({ args, set }: { args: TextureDemoProps; set: (patch: Partial<TextureDemoProps>) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Texture settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-3">
          <label className="grid gap-1 text-xs uppercase text-muted-foreground">
            Background
            <input type="color" value={args.background.startsWith("#") ? args.background : "#f5f5f5"} onChange={(event) => set({ background: event.target.value })} />
          </label>
          <Slider label="Static noise opacity" value={args.noiseOpacity} min={0} max={0.9} step={0.01} onChange={(noiseOpacity) => set({ noiseOpacity })} />
          <Slider label="Static noise size" value={args.noiseSize} min={24} max={180} step={2} onChange={(noiseSize) => set({ noiseSize })} />
          <Slider label="Static noise contrast" value={args.noiseContrast} min={100} max={400} step={5} onChange={(noiseContrast) => set({ noiseContrast })} />
          <Slider label="Big grunge opacity" value={args.grungeOpacity} min={0} max={0.9} step={0.01} onChange={(grungeOpacity) => set({ grungeOpacity })} />
          <Slider label="Big grunge size" value={args.grungeSize} min={160} max={1200} step={20} onChange={(grungeSize) => set({ grungeSize })} />
          <Slider label="Big grunge contrast" value={args.grungeContrast} min={100} max={500} step={10} onChange={(grungeContrast) => set({ grungeContrast })} />
          <Slider label="Big grunge brightness" value={args.grungeBrightness} min={50} max={300} step={5} onChange={(grungeBrightness) => set({ grungeBrightness })} />
          <label className="grid gap-1 text-xs uppercase text-muted-foreground">
            Blend mode
            <select className="border bg-background p-2 text-foreground" value={args.blendMode} onChange={(event) => set({ blendMode: event.target.value as TextureDemoProps["blendMode"] })}>
              {blendModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
            </select>
          </label>
        </div>
        <pre className="overflow-auto border bg-muted p-3 text-xs text-foreground">{cssValues(args)}</pre>
      </CardContent>
    </Card>
  );
}

function TextureDemo({ onChange, ...args }: TextureDemoViewProps) {
  const style = textureStyle(args);

  return (
    <div className="min-h-screen space-y-6 bg-background p-8 text-foreground">
      <div>
        <h1 className="font-primary text-4xl uppercase text-primary">Texture Utility</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          CSS-Tricks style static SVG turbulence noise: fine noise on top, larger random grunge underneath. Tune, then send the CSS values.
        </p>
      </div>

      <TextureControls args={args} set={(patch) => onChange?.(patch)} />

      <div className="aottg2-texture h-40 border p-6 shadow-lg" style={style}>
        <div className="font-primary text-3xl uppercase">Static noise + grunge</div>
        <p className="max-w-lg text-sm">No circle gradients. Just noise layers, contrast/brightness, and blending.</p>
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

function TextureStory(args: TextureDemoProps) {
  const [, updateArgs] = useArgs<TextureDemoProps>();

  return <TextureDemo {...args} onChange={updateArgs} />;
}

const meta = {
  title: "Utilities/Texture",
  component: TextureDemo,
  parameters: { layout: "fullscreen" },
  argTypes: {
    background: { control: "color" },
    noiseOpacity: { control: { type: "range", min: 0, max: 0.9, step: 0.01 } },
    noiseSize: { control: { type: "range", min: 24, max: 180, step: 2 } },
    noiseContrast: { control: { type: "range", min: 100, max: 400, step: 5 } },
    grungeOpacity: { control: { type: "range", min: 0, max: 0.9, step: 0.01 } },
    grungeSize: { control: { type: "range", min: 160, max: 1200, step: 20 } },
    grungeContrast: { control: { type: "range", min: 100, max: 500, step: 10 } },
    grungeBrightness: { control: { type: "range", min: 50, max: 300, step: 5 } },
    blendMode: { control: "select", options: blendModes },
  },
  args: {
    background: "hsl(0 0% 96%)",
    noiseOpacity: 0.34,
    noiseSize: 72,
    noiseContrast: 190,
    grungeOpacity: 0.28,
    grungeSize: 560,
    grungeContrast: 320,
    grungeBrightness: 130,
    blendMode: "overlay",
  },
} satisfies Meta<typeof TextureDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: TextureStory,
};

export const Dark: Story = {
  render: TextureStory,
  args: {
    background: "hsl(0 0% 7%)",
    noiseOpacity: 0.38,
    noiseSize: 64,
    noiseContrast: 220,
    grungeOpacity: 0.32,
    grungeSize: 620,
    grungeContrast: 350,
    grungeBrightness: 120,
    blendMode: "overlay",
  },
};

export const PaletteColors: Story = {
  render: TextureStory,
  args: {
    background: "hsl(196 78% 61%)",
    noiseOpacity: 0.28,
    noiseSize: 76,
    noiseContrast: 180,
    grungeOpacity: 0.24,
    grungeSize: 540,
    grungeContrast: 280,
    grungeBrightness: 135,
    blendMode: "overlay",
  },
};

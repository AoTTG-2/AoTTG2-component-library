import type { Meta, StoryObj } from "@storybook/react";
import { Bell } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/index";

const meta = {
  title: "AoTTG2/Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Showcase: Story = {
  render: () => (
    <div className="mx-auto grid max-w-5xl gap-8">
      <section className="space-y-4">
        <h1 className="font-primary text-6xl uppercase text-primary">AoTTG2 UI</h1>
        <p className="max-w-2xl text-muted-foreground">Minimal shadcn components with the current AoTTG2 website look.</p>
      </section>

      <section className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="brush" size="lg">Brush</Button>
        <Button variant="brushSecondary" size="lg">Brush 2</Button>
        <Button variant="brushGoogle" size="lg">Google</Button>
      </section>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Engraved input + brush button.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="scout@aottg2.com" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="brush" size="lg">Continue</Button>
        </CardFooter>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>News</AlertTitle>
          <AlertDescription>Default alert style.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Ready</AlertTitle>
          <AlertDescription>Success alert style.</AlertDescription>
        </Alert>
      </section>

      <section className="flex flex-wrap items-center gap-4">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Avatar><AvatarFallback>AG</AvatarFallback></Avatar>
        <Separator className="w-40" />
      </section>

      <Tabs defaultValue="one" className="max-w-md">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First tab.</TabsContent>
        <TabsContent value="two">Second tab.</TabsContent>
      </Tabs>

      <section className="flex flex-wrap gap-4">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>Radix dialog with AoTTG2 styling.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet</SheetTitle>
              <SheetDescription>Side panel.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline">Menu</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select>
          <SelectTrigger className="w-44"><SelectValue placeholder="Server" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="na">NA</SelectItem>
            <SelectItem value="eu">EU</SelectItem>
          </SelectContent>
        </Select>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild><Button variant="outline">Tooltip</Button></TooltipTrigger>
            <TooltipContent>Useful hint.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
    </div>
  ),
};

import { Reveal } from "./Reveal";

interface Props {
  title: string;
  dir?: "l" | "r";
}

export const SectionHeader = ({ title, dir = "r" }: Props) => {
  return (
    <div
      className="flex items-center gap-8 mb-12"
      style={{ flexDirection: dir === "r" ? "row" : "row-reverse" }}
    >
      <div className="w-full h-[1px] bg-border" />
      <h2 className="flex-shrink-0 whitespace-nowrap">
        <Reveal>
          <span className="text-3xl md:text-5xl font-black text-end text-foreground">
            {title}
            <span className="text-green-500 dark:text-primary">.</span>
          </span>
        </Reveal>
      </h2>
    </div>
  );
};

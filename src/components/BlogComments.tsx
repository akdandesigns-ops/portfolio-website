import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function BlogComments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full max-w-[720px] mt-16 pt-16 border-t border-border">
      <h3 className="font-bebas text-4xl mb-8 uppercase tracking-wide">Comments</h3>
      <Giscus
        id="comments"
        repo="akdandesigns/akdandesigns" // Placeholder, user will need to update
        repoId="R_kgDOMP_f6w" // Placeholder
        category="Announcements" // Placeholder
        categoryId="DIC_kwDOMP_f684CgVvq" // Placeholder
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
      <p className="text-xs text-muted mt-4 font-mono">
        Note: You will need to configure your GitHub repository details in src/components/BlogComments.tsx for comments to work.
      </p>
    </div>
  );
}

import { Github, Linkedin, Mail, Twitter, Smile } from "lucide-react";
import { profile, socials } from "@/data/site";

const items = [
  { href: socials.github, label: "GitHub", Icon: Github },
  { href: socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: socials.x, label: "X / Twitter", Icon: Twitter },
  { href: socials.huggingface, label: "Hugging Face", Icon: Smile },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
].filter((i) => i.href);

export default function SocialLinks({ size = 18 }: { size?: number }) {
  return (
    <ul className="flex items-center gap-1">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-accent"
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}

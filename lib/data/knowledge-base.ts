import { education, experience, profile, projects, skillCategories } from "./resume";

export function renderKnowledgeBaseMarkdown(): string {
  const bio = profile.bioParagraphs.join("\n\n");

  const skills = skillCategories
    .map((cat) => `- **${cat.label}:** ${cat.skills.join(", ")}`)
    .join("\n");

  const exp = experience
    .map((entry) => {
      const projectLines = entry.projects
        .map(
          (p) =>
            `  - **${p.name}:** ${p.description}${
              p.responsibilities ? ` Responsibilities: ${p.responsibilities}` : ""
            } (Tech: ${p.tech.join(", ")})`
        )
        .join("\n");
      return `### ${entry.title} — ${entry.company} (${entry.location}) — ${entry.startDate} to ${entry.endDate}\n${projectLines}`;
    })
    .join("\n\n");

  const sideProjects = projects
    .map(
      (p) =>
        `- **${p.title}** (${p.year}): ${p.description} (Tech: ${p.tech.join(", ")})`
    )
    .join("\n");

  return `# ${profile.name} — Resume Knowledge Base

## Profile
- Name: ${profile.name}
- Tagline: ${profile.tagline}
- Location: ${profile.location}
- Email: ${profile.email}
- Phone: ${profile.phone}
- LinkedIn: ${profile.linkedin}
- GitLab: ${profile.gitlab}
- GitHub: ${profile.github}

## Bio
${bio}

## Education
${education.degree} — ${education.institution}, ${education.location} (${education.startDate} – ${education.endDate})

## Skills
${skills}

## Work Experience (reverse chronological)
${exp}

## Personal / Side Projects
${sideProjects}
`;
}

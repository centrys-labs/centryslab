import Link from "next/link";
import type { Project } from "@/lib/content";
import { projectPage } from "@/lib/content";
import Commit, { CommitMeta } from "./Commit";

export default function ProjectCommit({ project }: { project: Project }) {
  return (
    <Commit on={[0, 1, 2, 3]} node={project.lane} lane={project.lane}>
      <CommitMeta hash={project.hash}>{`(${project.slug})`}</CommitMeta>
      <h2 className="project-name" id={`project-${project.slug}`}>
        {project.name}
      </h2>
      <p className="tagline tagline--project">{project.description}</p>
      <p className="copy">{project.body}</p>
      <ul className="kv">
        <li>
          {projectPage.languageLabel}: {project.language}
        </li>
        <li>
          {projectPage.licenseLabel}: {project.license}
        </li>
      </ul>
      <p className="links-row">
        <Link href={`/projects/${project.slug}`}>
          More about {project.name}
        </Link>
        <a href={project.repo}>{project.repo.replace(/^https?:\/\//, "")}</a>
      </p>
    </Commit>
  );
}

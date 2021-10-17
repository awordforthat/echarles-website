// frameworks
import * as React from 'react';
import Image from 'next/image';

// css
import project from '../styles/project.module.scss';
import { IProject } from '../pages/api/project';

interface IProjectProps extends IProject {
  theme?: 'dark' | 'light';
}

export function Project({
  title,
  image,
  description,
  link,
  technologies,
  theme,
}: IProjectProps) {
  return (
    <a
      href={link}
      className={`${project.project} ${theme == 'dark' ? project.dark : ''}`}
    >
      <Image
        src={image}
        layout="responsive"
        className={project.thumbnail}
        width={400}
        height={300}
        placeholder={'blur'}
        blurDataURL={'/dataBlur.png'}
      />
      <div className={project.title}>{title}</div>
      <div className={project['transition-gradient']} />
      <div className={project.contents}>{description}</div>
      <div className={project.footer}>
        <div className={project.more}></div>
        <div className={project.technologies}>
          {technologies.map((tech, index) => {
            return (
              <div
                key={`${title}-tech-${index}`}
                className={project.technology}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>
    </a>
  );
}

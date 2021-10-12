// frameworks
import * as React from 'react';
import Image from 'next/image';

// components
import { Link } from './link';

// css
import project from '../styles/project.module.scss';
import { IProject } from '../pages/api/project';

interface IProjectProps extends IProject {
  theme: 'dark' | 'light';
}

export function Project({
  title,
  image,
  description,
  link,
  technologies,
}: IProjectProps) {
  return (
    <div className={`${project.project} ${project.dark}`}>
      <Image
        src={image}
        className={project.thumbnail}
        width={400}
        height={300}
        placeholder={'blur'}
        blurDataURL={'/dataBlur.png'}
      />
      <div className={project.title}>{title}</div>
      <div className={project.contents}>
        {description}
        <div className={project.footer}>
          <div className={project.more}>
            <Link target={link} text={'see more'} />
          </div>
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
      </div>

      <Link text="learn more" target={link} download={false} />
    </div>
  );
}

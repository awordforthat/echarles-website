// framework
import type { NextPage } from 'next';
import Head from 'next/head';

// components
import { Link } from '../ui/link';
import { Project } from '../ui/project';
import { IProject } from './api/project';

// config
import { projects, skills } from '../content';

// styles
import styles from '../styles/Home.module.scss';
import theming from '../styles/theming.module.scss';
import animations from '../styles/animations.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div
        style={{ width: '100vw', height: '20px' }}
        className={`${styles['color-bar']} ${animations.colorshift}`}
      />
      <Head>
        <title>Oh hi!</title>
        <meta name="description" content="Emily Charles - personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section id="greeting">
          <h1 className={styles.title}>Hi, I'm Emily!</h1>
          <h2 className={styles.subtitle}>
            Software engineer, serial dabbler, language enthusiast
          </h2>
        </section>

        <section id="about-me" className={styles.about}>
          <h2>About Me</h2>
          <div>
            I'm a software engineer, and I love working on projects that merge
            the physical world and the virtual world. What I do doesn't fit
            neatly into the "front-end" and "back-end" buckets, and I really
            like that! I've worked with a wide variety of skills that include
            traditional web development, museum interactives, game development,
            benchtop electronics, and more.
          </div>

          <div></div>

          <div>
            I enjoy sharing knowledge, and I'm dedicated to creating and
            participating in spaces that foster open communication around
            technical subjects.
          </div>
        </section>
        <section id="featured-projects">
          <h2>Featured Projects</h2>
          <h3>Professional</h3>
          <div className={styles.projects}>
            {Object.entries(projects)
              // eslint-disable-next-line no-unused-vars
              .filter(([key, project]: [string, IProject]) => {
                return !project.personal;
              })
              // eslint-disable-next-line no-unused-vars
              .map(([key, project]: [string, IProject]) => {
                return (
                  <Project
                    key={project.title.replace(' ', '')}
                    {...project}
                    theme={'dark'}
                  />
                );
              })}
          </div>
          <div className={theming.separator} />
          <h3>Personal</h3>
          <div className={styles.projects}>
            {Object.entries(projects)
              // eslint-disable-next-line no-unused-vars
              .filter(([key, project]: [string, IProject]) => {
                return project.personal;
              })
              // eslint-disable-next-line no-unused-vars
              .map(([key, project]: [string, IProject]) => {
                return (
                  <Project
                    key={project.title.replace(' ', '')}
                    {...project}
                    theme={'dark'}
                  />
                );
              })}
          </div>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <div className={styles['skill-list']}>
            {skills.map((category, index) => {
              return (
                <div
                  key={`skill-section-${index}`}
                  className={styles['skill-section']}
                >
                  <div className={styles['skill-name-container']}>
                    <h3>{category.title}</h3>
                  </div>
                  <ul>
                    {category.content.map((skill) => {
                      return (
                        <li key={`skill-${skill.replace(' ', '')}`}>{skill}</li>
                      );
                    })}
                  </ul>
                  {category.learning && (
                    <div className={`learning`}>
                      Learning:
                      <ul>
                        {category.learning.map((skill) => {
                          return (
                            <li key={`skill-${skill.replace(' ', '')}`}>
                              {skill}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className={`${styles.footer} ${animations.colorshift}`}>
        <div id="construction">
          <div>
            This site is a bit of a sandbox. Please forgive any rough edges!
          </div>
          <div className="exclamation">!</div>
        </div>
        <ul>
          <li>
            <Link text="Resume" target="/ECharlesResume.pdf" download={true} />
          </li>
          <li>
            <Link text="Contact" target="mailto:hello@emilywcharles.com" />
          </li>

          <li>
            <Link text="Github" target="http://www.github.com/awordforthat" />
          </li>
          <li>
            <Link
              text="LinkedIn"
              target="https://www.linkedin.com/in/emily-charles-a87716126/"
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;

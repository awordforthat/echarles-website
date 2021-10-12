// framework
import type { NextPage } from 'next';
import Head from 'next/head';

// components
import { Link } from '../ui/link';
import { Project } from '../ui/project';

// config
import { projects } from '../content';

// styles
import styles from '../styles/Home.module.scss';
import theming from '../styles/theming.module.scss';
import { IProject } from './api/project';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
            like that! I've worked with a wide variety of technologies that
            include traditional web development, museum interactives, game
            development, benchtop electronics, and more.
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

        {/* <section id="skills">
          <h2>Skills</h2>
        </section>
        <section>
          <h2>Project ideas</h2>
          <div></div>
        </section>
        <section id="life">
          <h2>Other Interests</h2>
          <div>Occasionally I do things that are not code</div>
          <div>Woodworking</div>
          <div>Parkour</div>
        </section> */}
      </main>

      <footer className={styles.footer}>
        <div id="construction">
          <div>
            This site is a bit of a sandbox. Please forgive any rough edges!
          </div>
          <div className="exclamation">!</div>
        </div>
        <ul>
          <li>
            <Link text="Contact" target="mailto:hello@emilywcharles.com" />
          </li>
          <li>
            <Link text="Resume" target="/ECharlesResume.pdf" download={true} />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;

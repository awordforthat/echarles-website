// framework
import type { NextPage } from 'next';
import Head from 'next/head';

// components
import { Link as ThemedLink } from '../ui/link';
import { Project } from '../ui/project';

// config
import { projects } from '../content';

// styles
import styles from '../styles/Home.module.scss';
import theming from '../styles/theming.module.scss';

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
          <Project {...projects.level99} theme={'dark'} />
          <div className={theming.separator} />
          <div>Pedestrian tracker</div>
          <div>L99 sim</div>
          <div>ChoreoV??</div>

          <h3>Personal</h3>
          <div>Desktop doorbell</div>
          <div>Knowledge in Common</div>
          <div>Bionic Leg</div>
        </section>

        <section id="skills">
          <h2>Skills</h2>
        </section>
        <section>
          <h2>Project ideas</h2>
          <div></div>
        </section>
        <section id="life">
          <h2>Other Interests</h2>
          <div>Occasionally I do things that are not code...</div>
          <div>Woodworking</div>
          <div>Parkour</div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div id="construction" className={styles.center}>
          This site is perpetually under construction. (I'm currently using it
          to learn Next.JS, very exciting.) Please forgive any rough edges!
        </div>
        <ul>
          <li>
            <ThemedLink
              text="Contact"
              target="mailto:hello@emilywcharles.com"
            />
          </li>
          <li>
            <ThemedLink
              text="Resume"
              target="/ECharlesResume.pdf"
              download={true}
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;

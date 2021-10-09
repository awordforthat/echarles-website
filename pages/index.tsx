import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.scss';

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
          <div className={styles.center}>
            I'm a software engineer, and I like working at the borders of
            things. I've worked on projects that merge speech and software,
            physiotherapy and costume design, the physical world and the virtual
            world, and more.
          </div>
          <div>
            I enjoy sharing knowledge, and I'm dedicated to creating and
            participating in spaces that foster open communication around
            technical subjects.
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div id="construction" className={styles.center}>
          This site is perpetually under construction. (I'm currently using it
          to learn Next.JS, very exciting.) Please forgive any rough edges!
        </div>
        <ul>
          <li>Email me</li>
          <li>Resume (PDF)</li>
          <li>Woodworking</li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;

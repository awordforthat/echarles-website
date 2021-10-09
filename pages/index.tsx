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
          <div className={styles.center}>
            I'm a software engineer, and I like to work between domains. The
            most interesting problems
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
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

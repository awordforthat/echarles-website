import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.scss";

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
            I'm a software engineer, and I like to work on the borders of
            things.
          </div>
          <div className={styles.center}>
            That's where the most interesting things happen.
          </div>
          <div className={styles.center}>
            I like controlling the real world from the virtual world (Level99)
          </div>
          <div className={styles.center}>
            Or the virtual world from the real world (ChoreoV)
          </div>
          <div className={styles.center}>
            I like making hybrid things (bionic leg)
          </div>
          <div className={styles.center}>
            and nerdy linguistic things (rhyme detector)
          </div>
          <div className={styles.center}>
            and things that connect people with different interests (KiC)
          </div>
          <div className={styles.center}>More detail to come!</div>
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
